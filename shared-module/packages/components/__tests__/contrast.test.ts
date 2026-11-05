import { themes } from "../src/styles/themes"
import type { ThemeColorRoles } from "../src/styles/themes"

// WCAG 2.2 AA: 4.5:1 for text, 3:1 for UI component boundaries, icons and focus indicators
// (1.4.3, 1.4.11). Each pair is a role used as text or a boundary on the role it is drawn on.
// Every registered theme is checked, so a new theme is held to the same pairs.
type Role = keyof ThemeColorRoles
const TEXT = 4.5
const UI = 3

const textSurfaces: Role[] = ["bg", "surface", "surfaceRaised", "surfaceSunken"]
const pairs: Array<[Role, Role, number]> = [
  ...(["text", "textMuted", "textStrong", "textStronger", "link", "linkHover"] as Role[]).flatMap(
    (text) => textSurfaces.map((surface): [Role, Role, number] => [text, surface, TEXT]),
  ),
  ["accent", "surface", TEXT],
  ["textOnAccent", "accent", TEXT],
  ["textOnAccent", "accentHover", TEXT],
  ["textOnAccent", "accentPressed", TEXT],
  ["textInverse", "surfaceInverse", TEXT],
  ["textOnAccent", "dangerFill", TEXT],
  ["textOnAccent", "dangerFillHover", TEXT],
  ["textOnAccent", "dangerFillPressed", TEXT],
  ["dangerText", "surface", TEXT],
  ["dangerText", "dangerBg", TEXT],
  ["warningText", "surface", TEXT],
  ["warningFg", "warningBg", TEXT],
  ["text", "successBg", TEXT],
  ["text", "infoBg", TEXT],
  ["focusRing", "surface", UI],
  ["borderStrong", "surface", UI],
  ["borderFocus", "surface", UI],
  // controlBorder is left out on purpose: it outlines tertiary buttons, which their label
  // identifies, so the border is decorative under 1.4.11.
  ["controlTrackOff", "surface", UI],
  ["successFg", "successBg", UI],
  ["dangerFg", "dangerBg", UI],
  ["infoFg", "infoBg", UI],
  ["badgeIcon", "surface", UI],
  ["controlIconStrong", "surface", UI],
  ["codeText", "codeBg", TEXT],
  ["codeText", "codeTooltipBg", TEXT],
  ["codeSuccess", "codeBg", UI],
  ["codeDanger", "codeBg", UI],
]

type Rgba = [number, number, number, number]

function parse(color: string): Rgba {
  const value = color.trim()
  if (value.startsWith("#")) {
    let hex = value.slice(1)
    if (hex.length <= 4) {
      hex = [...hex].map((c) => c + c).join("")
    }
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
      hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1,
    ]
  }
  const [r = 0, g = 0, b = 0, a = 1] = (value.match(/[\d.]+/g) ?? []).map(Number)
  return [r, g, b, a]
}

function composite(color: string, below: [number, number, number]): [number, number, number] {
  const [r, g, b, a] = parse(color)
  return [r * a + below[0] * (1 - a), g * a + below[1] * (1 - a), b * a + below[2] * (1 - a)]
}

function luminance(rgb: [number, number, number]): number {
  const [r = 0, g = 0, b = 0] = rgb.map((channel) => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Contrast of `foreground` drawn on `background`, both possibly translucent; the background sits on the page background. */
export function contrast(foreground: string, background: string, page: string): number {
  const bg = composite(background, composite(page, [255, 255, 255]))
  const fg = composite(foreground, bg)
  const [light, dark] = [luminance(fg), luminance(bg)].sort((x, y) => y - x) as [number, number]
  return (light + 0.05) / (dark + 0.05)
}

describe.each(themes.map((theme) => [theme.name, theme] as const))(
  "%s theme contrast",
  (_, theme) => {
    test.each(pairs)("%s on %s is at least %d:1", (foreground, background, minimum) => {
      const ratio = contrast(theme.colors[foreground], theme.colors[background], theme.colors.bg)
      if (ratio < minimum) {
        throw new Error(
          `${foreground} ${theme.colors[foreground]} on ${background} ${theme.colors[background]} is ${ratio.toFixed(2)}:1`,
        )
      }
    })
  },
)
