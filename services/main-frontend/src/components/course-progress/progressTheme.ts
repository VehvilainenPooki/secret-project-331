import { css } from "@emotion/css"

import { secondaryFont } from "@/shared-module/common/styles"
import { colors, tones } from "@/shared-module/components/styles/themes"

/** Colours shared by the course progress charts and the exercise list. */
export const progressColors = {
  fill: tones.fgAccent7,
  track: tones.toneAccent9,
  /** The donut's threshold arc. */
  required: tones.toneWarning6,
  heading: tones.toneAccent23,
  text: colors.text,
  mutedText: colors.textMuted,
  rule: tones.borderNeutral31,
  panel: tones.toneInfo2,
  error: tones.toneDanger22,
}

/** Screen-reader-only text sits inside paragraphs and list items, so it must be inline. */
export const INLINE_ELEMENT = "span"

/** The small grey "?" that opens a chart's or the requirements' explanation. */
export const helpButtonCss = css`
  --btn-icon-fg: var(--tone-fg-neutral-16);
  --btn-icon-fg-hover: var(--tone-tone-neutral-44);
  --btn-icon-fg-pressed: var(--tone-tone-neutral-46);

  width: 1.25rem;
  height: 1.25rem;
  min-width: 0;
  padding: 0;
  font: 700 0.9375rem/1 ${secondaryFont};
  text-transform: none;
`
