/* oxlint-disable i18next/no-literal-string */

import { css } from "@emotion/css"

import { colors, tones } from "@/shared-module/components/styles/themes"

export const quizTheme = {
  gradingCorrectItemBackground: "var(--tone-bg-neutral-59)",
  gradingWrongItemBackground: "var(--tone-bg-neutral-43)",
  gradingCorrectItemColor: "var(--tone-fg-info-10)",
  gradingSelectedItemBorderColor: "var(--tone-fg-neutral-8)",
  // Darkened for >= 3:1 non-text contrast (WCAG 1.4.11) against the white page and the
  // light fill; matches the green[700]/red[700] icons in the submission view.
  gradingWrongItemBorderColor: tones.fgDanger10,
  gradingCorrectItemBorderColor: tones.fgAccent8,
  gradingSelectedItemBackground: "var(--tone-bg-neutral-32)",
  gradingSelectedItemColor: tones.fgNeutral4,
  errorItemForegroundColor: tones.fgNeutral4,
  errorItemBackgroundColor: tones.fgDanger8,
  successItemBackgroundColor: tones.fgAccent7,
  successItemForegroundColor: tones.fgNeutral4,
  feedbackBackground: colors.surfaceSunken,
  gradingWrongItemColor: "var(--tone-fg-info-10)",
  quizBodyColor: colors.text,
  quizBodyFontSize: "24px",
  quizItemBackground: "fff",
  quizTitleFontSize: "20px",
  selectedItemBackground: tones.bgNeutral90,
  selectedItemColor: tones.fgNeutral3,
  // Quiz multiplechoices editor
  quizAnswer: tones.toneNeutral12,
  quizWrongAnswer: tones.toneDanger21,
  quizWrongAnswerHover: tones.toneDanger18,
  quizCorrectAnswer: tones.toneAccent21,
  quizCorrectAnswerHover: tones.toneAccent19,
}

export const SelectedQuizItem = css`
  background: ${tones.toneAccent7};
  color: ${tones.toneNeutral29};
`
