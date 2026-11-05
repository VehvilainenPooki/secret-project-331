import { colorScales, gradients } from "@/shared-module/components/styles/palette"
import { colors, tones } from "@/shared-module/components/styles/themes"

export interface ColorShades {
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
}

export const baseTheme = {
  space: [0, 2, 4, 8, 16, 32],
  fontSizes: [14, 16, 18, 24, 32],
  colors: {
    ...colorScales,
    gradient: gradients,
  },
}

export const theme = {
  primary: {
    text: colors.textOnAccent,
    border: tones.borderNeutral2,
    bg: colors.accent,
    hoverText: tones.fgAccent7,
    hoverBg: colors.surface,
    hoverBorder: tones.borderAccent10,
    focusBorder: tones.borderNeutral2,
    activeBg: colors.surfaceSunken,
    disabledText: tones.fgNeutral16,
    disabledBg: colors.surfaceSunken,
    disabledBorder: tones.borderNeutral2,
  },
  secondary: {
    text: colors.text,
    border: tones.borderNeutral2,
    bg: tones.bgNeutral52,
    hoverText: tones.fgNeutral44,
    hoverBg: tones.bgNeutral62,
    hoverBorder: tones.borderNeutral44,
    focusBorder: tones.borderNeutral2,
    focusBg: colors.surfaceSunken,
    activeBg: colors.surface,
    disabledText: tones.fgNeutral16,
    disabledBg: colors.surfaceSunken,
    disabledBorder: tones.borderNeutral2,
  },
  reject: {
    bg: tones.bgNeutral52,
    border: tones.borderNeutral2,
    text: tones.fgDanger6,
    hoverText: tones.fgDanger6,
    hoverBg: colors.surface,
    hoverBorder: tones.borderDanger8,
    focusBorder: tones.borderNeutral2,
    activeBg: colors.surfaceSunken,
    disabledText: tones.fgNeutral16,
    disabledBg: colors.surfaceSunken,
    disabledBorder: tones.borderNeutral2,
  },
  tertiary: {
    text: tones.fgNeutral3,
    border: tones.borderNeutral2,
    bg: tones.bgNeutral90,
    hoverText: colors.text,
    hoverBg: colors.surfaceSunken,
    hoverBorder: tones.borderNeutral2,
    focusBorder: tones.borderNeutral2,
    activeBg: colors.surfaceSunken,
    disabledText: tones.fgNeutral16,
    disabledBg: colors.surfaceSunken,
    disabledBorder: tones.borderNeutral2,
  },
  white: {
    text: colors.textMuted,
    border: tones.borderNeutral2,
    bg: tones.bgNeutral90,
    hoverText: colors.text,
    hoverBg: colors.surfaceSunken,
    hoverBorder: tones.borderNeutral2,
    focusBorder: tones.borderNeutral2,
    activeBg: colors.surfaceSunken,
    disabledText: tones.fgNeutral16,
    disabledBg: colors.surfaceSunken,
    disabledBorder: tones.borderNeutral2,
  },
  buttonSizes: {
    small: {
      fontSize: baseTheme.fontSizes[1],
      padding: `0.3rem 0.6rem`,
    },
    medium: {
      fontSize: baseTheme.fontSizes[2],
      padding: `0.5625rem 1.125rem`,
    },
    large: {
      fontSize: baseTheme.fontSizes[4],
      padding: `1rem 2.125rem`,
    },
  },
}
