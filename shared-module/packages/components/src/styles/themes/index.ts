import { lightTheme } from "./light"
import type { CmsColorRoles, Theme, ThemeColorRoles } from "./types"

export type { CmsColorRoles, Theme, ThemeColorRoles } from "./types"
export { lightTheme } from "./light"

/** Every theme that gets a CSS block. The first one is also the `:root` default. */
export const themes: readonly [Theme, ...Theme[]] = [lightTheme]

/** `surfaceRaised` → `surface-raised`, `chart1` → `chart-1`. */
function kebabCase(name: string): string {
  return name.replaceAll(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase()
}

const colorVarName = (role: string) => `--color-${kebabCase(role)}`
const cmsColorVarName = (role: string) => `--color-cms-${kebabCase(role)}`

/** One theme's roles as custom property declarations. */
export function themeCustomProperties(theme: Theme): string {
  return [
    ...Object.entries(theme.colors).map(([role, value]) => `${colorVarName(role)}: ${value};`),
    ...Object.entries(theme.cms).map(([role, value]) => `${cmsColorVarName(role)}: ${value};`),
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

/** CMS-only color roles, as `var(...)` references: `cmsColors.blockBg === "var(--color-cms-block-bg)"`. */
export const cmsColors: Readonly<Record<keyof CmsColorRoles, string>> = roleVars(
  lightTheme.cms,
  cmsColorVarName,
)
