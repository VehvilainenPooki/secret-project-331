import { cmsColors, colors, lightTheme, themesCss } from "../src/styles/themes"
import type { Theme } from "../src/styles/themes"
import "../src/styles/themes/global"

describe("theme color roles", () => {
  test("JS exports reference the role custom properties", () => {
    expect(colors.text).toBe("var(--color-text)")
    expect(colors.surfaceRaised).toBe("var(--color-surface-raised)")
    expect(colors.successFg).toBe("var(--color-success-fg)")
    expect(colors.chart1).toBe("var(--color-chart-1)")
    expect(cmsColors.blockBg).toBe("var(--color-cms-block-bg)")
  })

  test("there is a JS export for every role", () => {
    expect(Object.keys(colors)).toEqual(Object.keys(lightTheme.colors))
    expect(Object.keys(cmsColors)).toEqual(Object.keys(lightTheme.cms))
  })

  test("the default theme is emitted on :root and under its data-theme attribute", () => {
    const rule = Array.from(document.styleSheets[0]!.cssRules).find(
      (r): r is CSSStyleRule =>
        r instanceof CSSStyleRule &&
        r.selectorText
          .split(",")
          .map((s) => s.trim())
          .join(", ") === ':root, [data-theme="light"]',
    )
    expect(rule).toBeDefined()
    expect(rule!.style.getPropertyValue("--color-text")).toBe(lightTheme.colors.text)
    expect(rule!.style.getPropertyValue("--color-cms-block-bg")).toBe(lightTheme.cms.blockBg)
    expect(rule!.style.getPropertyValue("--code-editor-theme")).toBe("vs")
  })

  test("other themes are emitted under their data-theme attribute only", () => {
    const other: Theme = { ...lightTheme, name: "other" }
    const css = themesCss([lightTheme, other])
    expect(css).toContain(':root, [data-theme="light"] {')
    expect(css).toContain('\n[data-theme="other"] {')
    expect(css.match(/:root/g)).toHaveLength(1)
  })
})
