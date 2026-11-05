import { useCallback, useEffect, useState } from "react"

import { themes } from "./index"
import type { Theme } from "./types"

/**
 * The user's theme choice: a theme name, or "system" to follow the operating system's
 * light/dark setting. Kept in a cookie only; no cookie means "system".
 */
export type ThemePreference = string

export const THEME_COOKIE = "theme"
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365
const CHANGE_EVENT = "themepreferencechange"

const findTheme = (name: string | undefined): Theme | undefined =>
  themes.find((theme) => theme.name === name)

export function readThemePreference(): ThemePreference {
  if (typeof document === "undefined") {
    return "system"
  }
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${THEME_COOKIE}=([^;]*)`))
  const raw = match?.[1]
  const value = raw === undefined ? undefined : decodeURIComponent(raw)
  return findTheme(value) ? (value as string) : "system"
}

function writeThemePreference(preference: ThemePreference) {
  document.cookie = `${THEME_COOKIE}=${encodeURIComponent(preference)}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`
}

/** The theme to show: "system" picks the first dark theme when the OS asks for dark, otherwise the default theme. */
export function resolveTheme(preference: ThemePreference): Theme {
  const chosen = preference === "system" ? undefined : findTheme(preference)
  if (chosen) {
    return chosen
  }
  const prefersDark =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches
  return (prefersDark && themes.find((theme) => theme.colorScheme === "dark")) || themes[0]
}

/** Shows `theme` on the page: the `data-theme` attribute every theme's CSS hangs on, and `color-scheme` for native controls. */
export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme.name
  root.style.colorScheme = theme.colorScheme
}

/**
 * Applies the preference before the first paint, so the page never flashes the wrong theme.
 * Inline it at the top of <body>; it is self-contained.
 */
export const themeInitScript = `(function () {
  try {
    var themes = ${JSON.stringify(themes.map(({ name, colorScheme }) => ({ name, colorScheme })))};
    var match = document.cookie.match(/(?:^|;\\s*)${THEME_COOKIE}=([^;]*)/);
    var name = match ? decodeURIComponent(match[1]) : "system";
    var theme = themes.filter(function (t) { return t.name === name; })[0];
    if (!theme) {
      var dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      theme = (dark && themes.filter(function (t) { return t.colorScheme === "dark"; })[0]) || themes[0];
    }
    document.documentElement.setAttribute("data-theme", theme.name);
    document.documentElement.style.colorScheme = theme.colorScheme;
  } catch (e) {}
})();`

/** The preference, the theme it resolves to, and a setter that stores the choice and applies it. */
export function useThemePreference() {
  const [preference, setPreferenceState] = useState<ThemePreference>(readThemePreference)
  const [activeTheme, setActiveTheme] = useState<Theme>(() => resolveTheme(preference))

  useEffect(() => {
    const update = () => {
      const current = readThemePreference()
      setPreferenceState(current)
      const theme = resolveTheme(current)
      setActiveTheme(theme)
      applyTheme(theme)
    }
    update()
    const query = window.matchMedia?.("(prefers-color-scheme: dark)")
    query?.addEventListener("change", update)
    window.addEventListener(CHANGE_EVENT, update)
    return () => {
      query?.removeEventListener("change", update)
      window.removeEventListener(CHANGE_EVENT, update)
    }
  }, [])

  const setPreference = useCallback((next: ThemePreference) => {
    writeThemePreference(next)
    // Every picker on the page (and the iframes, through <html>) follows the change.
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [])

  return { preference, activeTheme, themes, setPreference }
}
