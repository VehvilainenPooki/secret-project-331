import { lightTheme } from "./light"
import type { CmsColorRoles, Theme, ThemeColorRoles } from "./types"

export type { CmsColorRoles, Theme, ThemeColorRoles } from "./types"
export type { ToneName } from "./tones"
export { lightTheme } from "./light"

/** Every theme that gets a CSS block. The first one is also the `:root` default. */
export const themes: readonly [Theme, ...Theme[]] = [lightTheme]

/** `surfaceRaised` → `surface-raised`, `chart1` → `chart-1`. */
function kebabCase(name: string): string {
  return name.replaceAll(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase()
}

const colorVarName = (role: string) => `--color-${kebabCase(role)}`
const cmsColorVarName = (role: string) => `--color-cms-${kebabCase(role)}`
const toneVarName = (tone: string) => `--tone-${kebabCase(tone)}`

/** One theme's roles as custom property declarations. */
export function themeCustomProperties(theme: Theme): string {
  return [
    ...Object.entries(theme.colors).map(([role, value]) => `${colorVarName(role)}: ${value};`),
    ...Object.entries(theme.cms).map(([role, value]) => `${cmsColorVarName(role)}: ${value};`),
    ...Object.entries(theme.tones).map(([tone, value]) => `${toneVarName(tone)}: ${value};`),
    `--code-editor-theme: ${theme.codeEditorTheme};`,
  ].join("\n")
}

/**
 * Every theme as a block under `[data-theme="<name>"]`, with the default theme also on `:root` so
 * a page without the attribute still gets every role.
 */
export function themesCss(allThemes: readonly [Theme, ...Theme[]] = themes): string {
  return allThemes
    .map((theme, index) => {
      const selector = `[data-theme="${theme.name}"]`
      return `${index === 0 ? `:root, ${selector}` : selector} {\n${themeCustomProperties(theme)}\n}`
    })
    .join("\n\n")
}

function roleVars<Roles extends object>(
  roles: Roles,
  varName: (role: string) => string,
): Readonly<Record<keyof Roles, string>> {
  return Object.fromEntries(
    Object.keys(roles).map((role) => [role, `var(${varName(role)})`]),
  ) as Record<keyof Roles, string>
}

/**
 * Color roles for leaf code, as `var(...)` references that follow the active theme:
 * `colors.text === "var(--color-text)"`. Canvas-based code (charts) needs resolved values instead.
 */
export const colors: Readonly<Record<keyof ThemeColorRoles, string>> = roleVars(
  lightTheme.colors,
  colorVarName,
)

/**
 * `color` at `percent`% opacity. Unlike appending a hex alpha to a string, this also works when
 * `color` is a `var(...)` reference: `withAlpha(colors.shadow, 6)`.
 */
export function withAlpha(color: string, percent: number): string {
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`
}

/** CMS-only color roles, as `var(...)` references: `cmsColors.blockBg === "var(--color-cms-block-bg)"`. */
export const cmsColors: Readonly<Record<keyof CmsColorRoles, string>> = roleVars(
  lightTheme.cms,
  cmsColorVarName,
)

/**
 * Tones as `var(...)` references: `tones.fgNeutral9 === "var(--tone-fg-neutral-9)"`. See `tones.ts`
 * for what the names mean.
 */
export const tones: Readonly<Record<keyof typeof lightTheme.tones, string>> = roleVars(
  lightTheme.tones,
  toneVarName,
)

/**
 * `css` with every theme custom property reference replaced by `theme`'s value, so a test can check
 * the color a style resolves to: `resolveThemeVars("color: var(--color-text)")` gives the text color.
 */
export function resolveThemeVars(css: string, theme: Theme = lightTheme): string {
  const values = new Map(
    themeCustomProperties(theme)
      .split("\n")
      .map((declaration) => {
        const separator = declaration.indexOf(":")
        const name = declaration.slice(0, separator).trim()
        const value = declaration
          .slice(separator + 1)
          .trim()
          .replace(/;$/, "")
        return [name, value]
      }),
  )
  return css.replaceAll(/var\((--[\w-]+)\)/g, (match, name: string) => values.get(name) ?? match)
}

/**
 * The theme the page shows, for code that needs color values instead of `var(...)` references,
 * such as charts drawn on a canvas. Falls back to the default theme outside the browser.
 */
export function getActiveTheme(): Theme {
  const name = typeof document === "undefined" ? undefined : document.documentElement.dataset.theme
  return themes.find((theme) => theme.name === name) ?? themes[0]
}
