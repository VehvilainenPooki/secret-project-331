import type { ToneName } from "./tones"

/**
 * Semantic color roles. Leaf code refers to these, never to a palette shade, so a theme can give
 * every role its own value without touching components.
 *
 * Every theme must give every role a value; a theme missing one does not compile.
 */
export interface ThemeColorRoles {
  /** Page background behind everything. */
  bg: string
  /** Default background of content: cards, panels, tables, form fields. */
  surface: string
  /** Surfaces that float above the page: dialogs, popovers, menus. */
  surfaceRaised: string
  /** Recessed areas: wells, toolbars, page sections set off from the content. */
  surfaceSunken: string
  /** Background of controls that cannot be used. */
  surfaceDisabled: string
  /** Background of fields that can be read but not edited. */
  surfaceReadonly: string
  /** Background of the option under the pointer or keyboard focus in a list. */
  surfaceHighlight: string
  /** Background of a selected option in a list. */
  surfaceSelected: string
  /** A surface in the opposite tone, such as a neutral button's hover fill. */
  surfaceInverse: string

  text: string
  /** Secondary text: labels, descriptions, metadata. */
  textMuted: string
  /** Placeholders and decorative icons. */
  textSubtle: string
  textDisabled: string
  /** Text that should stand out from body text, such as what the user typed into a field. */
  textStrong: string
  /** One step beyond `textStrong`, such as an icon button while pressed. */
  textStronger: string
  /** Text and icons on an `accent` or status fill. */
  textOnAccent: string
  /** Text on `surfaceInverse`. */
  textInverse: string

  border: string
  /** Borders that must be seen: form fields, dividers that carry structure. */
  borderStrong: string
  /** Border of a focused field. */
  borderFocus: string

  link: string
  linkHover: string
  focusRing: string

  /** The brand color as a fill or a highlight. */
  accent: string
  accentHover: string
  accentPressed: string

  /** Neutral controls: the fill of a secondary button and the outline of a tertiary one. */
  controlBg: string
  controlBgPressed: string
  controlBorder: string
  /** Pressed fill of a control that has no fill at rest. */
  controlGhostBgPressed: string
  /** Track of a switch that is off. */
  controlTrackOff: string
  /** Knob of a switch. */
  controlThumb: string

  /** Status roles: `fg` is the icon and text color, `bg` the fill, `border` the stripe or outline. */
  successFg: string
  successBg: string
  successBorder: string
  warningFg: string
  warningBg: string
  warningBorder: string
  /** Warning text set directly on a surface, without a `warningBg` fill. */
  warningText: string
  dangerFg: string
  dangerBg: string
  dangerBorder: string
  /** Error text set directly on a surface, such as a field's error message. */
  dangerText: string
  /** Fill of a destructive button. */
  dangerFill: string
  dangerFillHover: string
  dangerFillPressed: string
  infoFg: string
  infoBg: string
  infoBorder: string

  /** Backdrop behind modal surfaces. */
  scrim: string
  /** Base color of shadows; elevations apply their own opacity. */
  shadow: string
  /**
   * Neutral overlay used at low opacity to set an area off from the surface under it (skeletons,
   * pressed insets). Darkens on a light theme.
   */
  tint: string
  /** Used at low opacity for highlights: bevels, shimmer. Brightens on a light theme. */
  sheen: string

  /** Categorical chart series, in the order a chart assigns them. */
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
  chart6: string
  /** Icons in the small exercise card badges (points, tries). */
  badgeIcon: string
  /** Strong icon on light controls, such as the quiz editor's remove-option icon. */
  controlIconStrong: string
  /** Unfilled track of the circular course progress ring. */
  progressRingTrack: string
  /** Faint background of an error state, such as a failed query. */
  dangerSurfaceSubtle: string
}

/**
 * Roles that only the CMS uses: the block editor's chrome, which looks different from the student
 * view. Kept apart from `ThemeColorRoles` so that shared components rendered inside the CMS keep
 * the same colors they have everywhere else.
 */
export interface CmsColorRoles {
  /** Background of a custom block's editing area in the editor canvas. */
  blockBg: string
  /** Gutenberg's default border color, used by the editor sidebar and editor-only panels. */
  editorBorder: string
  /** Background of inline code in the editor. */
  inlineCodeBg: string
}

export interface Theme {
  /** Used as the `data-theme` attribute value. */
  name: string
  /** Whether the theme is light or dark, for the CSS `color-scheme` of native controls and scrollbars. */
  colorScheme: "light" | "dark"
  colors: ThemeColorRoles
  cms: CmsColorRoles
  /** Exact-value tones for leaf code that has no purpose-named role yet; see `tones.ts`. */
  tones: Record<ToneName, string>
  /** Monaco theme name for code editors. */
  codeEditorTheme: string
}
