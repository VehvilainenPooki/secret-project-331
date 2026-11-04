import { colorScales, offPalette, white } from "../palette"
import type { Theme } from "./types"

const { blue, green, crimson, yellow, purple, gray, clear } = colorScales

/** The default theme. Each value is the color the UI already uses for that purpose. */
export const lightTheme: Theme = {
  name: "light",
  colors: {
    bg: white,
    surface: white,
    surfaceRaised: clear[50],
    surfaceSunken: clear[100],
    surfaceDisabled: gray[50],
    surfaceReadonly: blue[25],
    surfaceHighlight: blue[50],
    surfaceSelected: green[50],
    surfaceInverse: gray[700],

    text: gray[700],
    textMuted: gray[500],
    textSubtle: gray[400],
    textDisabled: gray[400],
    textStrong: gray[800],
    textStronger: gray[900],
    textOnAccent: white,
    textInverse: white,

    border: clear[300],
    borderStrong: gray[400],
    borderFocus: green[500],

    link: blue[700],
    linkHover: blue[800],
    focusRing: offPalette.focusRing,

    accent: green[600],
    accentHover: green[700],
    accentPressed: green[800],

    controlBg: clear[200],
    controlBgPressed: clear[400],
    controlBorder: clear[400],
    controlGhostBgPressed: clear[300],
    controlTrackOff: clear[800],
    controlThumb: white,

    successFg: green[600],
    successBg: green[50],
    successBorder: green[600],
    warningFg: gray[700],
    warningBg: yellow[100],
    warningBorder: yellow[700],
    warningText: yellow[900],
    dangerFg: crimson[600],
    dangerBg: crimson[75],
    dangerBorder: crimson[600],
    dangerText: crimson[700],
    dangerFill: crimson[700],
    dangerFillHover: crimson[800],
    dangerFillPressed: crimson[900],
    infoFg: blue[500],
    infoBg: blue[25],
    infoBorder: blue[500],

    scrim: offPalette.scrim,
    shadow: gray[800],
    tint: gray[1000],
    sheen: white,

    chart1: blue[600],
    chart2: green[400],
    chart3: crimson[700],
    chart4: yellow[400],
    chart5: purple[600],
    chart6: gray[400],
  },
  cms: {
    blockBg: offPalette.cmsBlockBg,
    editorBorder: offPalette.gutenbergGray300,
    inlineCodeBg: offPalette.cmsInlineCodeBg,
  },
  codeEditorTheme: "vs",
}
