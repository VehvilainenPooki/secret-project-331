/**
 * Semantic color roles. Leaf code refers to these, never to a palette shade, so a theme can give
 * every role its own value without touching components.
 *
 * Every theme must give every role a value; a theme missing one does not compile.
 */
export interface ThemeColorRoles {
  /** Page background behind everything. */
  bg: string
  /** Default background of content: cards, panels, tables. */
  surface: string
  /** Surfaces that float above the page: dialogs, popovers, menus. */
  surfaceRaised: string
  /** Recessed areas: wells, toolbars, page sections set off from the content. */
  surfaceSunken: string

  text: string
  /** Secondary text: labels, descriptions, metadata. */
  textMuted: string
  /** Text and icons on an `accent` fill. */
  textOnAccent: string

  border: string
  /** Borders that must be seen: form fields, dividers that carry structure. */
  borderStrong: string

  link: string
  linkHover: string
  focusRing: string

  /** The brand color as a fill or a highlight. */
  accent: string
  accentHover: string

  /** Status roles: `fg` is the icon and text color, `bg` the fill, `border` the stripe or outline. */
  successFg: string
  successBg: string
  successBorder: string
  warningFg: string
  warningBg: string
  warningBorder: string
  dangerFg: string
  dangerBg: string
  dangerBorder: string
  infoFg: string
  infoBg: string
  infoBorder: string

  /** Backdrop behind modal surfaces. */
  scrim: string
  /** Base color of shadows; elevations apply their own opacity. */
  shadow: string

  /** Categorical chart series, in the order a chart assigns them. */
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
  chart6: string
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
  colors: ThemeColorRoles
  cms: CmsColorRoles
  /** Monaco theme name for code editors. */
  codeEditorTheme: string
}
