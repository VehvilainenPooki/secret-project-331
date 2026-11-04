import { colorScales, gradients } from "@/shared-module/components/styles/palette"

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
    text: baseTheme.colors.primary[100],
    border: baseTheme.colors.clear[100],
    bg: baseTheme.colors.green[600],
    hoverText: baseTheme.colors.green[600],
    hoverBg: baseTheme.colors.primary[100],
    hoverBorder: baseTheme.colors.green[600],
    focusBorder: baseTheme.colors.clear[100],
    activeBg: baseTheme.colors.clear[100],
    disabledText: baseTheme.colors.gray[400],
    disabledBg: baseTheme.colors.clear[100],
    disabledBorder: baseTheme.colors.clear[100],
  },
  secondary: {
    text: baseTheme.colors.gray[700],
    border: baseTheme.colors.clear[100],
    bg: baseTheme.colors.clear[200],
    hoverText: baseTheme.colors.primary[200],
    hoverBg: baseTheme.colors.clear[300],
    hoverBorder: baseTheme.colors.clear[600],
    focusBorder: baseTheme.colors.clear[100],
    focusBg: baseTheme.colors.clear[100],
    activeBg: baseTheme.colors.primary[100],
    disabledText: baseTheme.colors.gray[400],
    disabledBg: baseTheme.colors.clear[100],
    disabledBorder: baseTheme.colors.clear[100],
  },
  reject: {
    bg: baseTheme.colors.clear[200],
    border: baseTheme.colors.clear[100],
    text: baseTheme.colors.red[600],
    hoverText: baseTheme.colors.red[600],
    hoverBg: baseTheme.colors.primary[100],
    hoverBorder: baseTheme.colors.red[600],
    focusBorder: baseTheme.colors.clear[100],
    activeBg: baseTheme.colors.clear[100],
    disabledText: baseTheme.colors.gray[400],
    disabledBg: baseTheme.colors.clear[100],
    disabledBorder: baseTheme.colors.clear[100],
  },
  tertiary: {
    text: baseTheme.colors.clear[100],
    border: baseTheme.colors.clear[100],
    bg: baseTheme.colors.gray[700],
    hoverText: baseTheme.colors.gray[700],
    hoverBg: baseTheme.colors.clear[100],
    hoverBorder: baseTheme.colors.clear[100],
    focusBorder: baseTheme.colors.clear[100],
    activeBg: baseTheme.colors.clear[100],
    disabledText: baseTheme.colors.gray[400],
    disabledBg: baseTheme.colors.clear[100],
    disabledBorder: baseTheme.colors.clear[100],
  },
  white: {
    text: baseTheme.colors.gray[500],
    border: baseTheme.colors.clear[100],
    bg: baseTheme.colors.gray[700],
    hoverText: baseTheme.colors.gray[700],
    hoverBg: baseTheme.colors.clear[100],
    hoverBorder: baseTheme.colors.clear[100],
    focusBorder: baseTheme.colors.clear[100],
    activeBg: baseTheme.colors.clear[100],
    disabledText: baseTheme.colors.gray[400],
    disabledBg: baseTheme.colors.clear[100],
    disabledBorder: baseTheme.colors.clear[100],
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
