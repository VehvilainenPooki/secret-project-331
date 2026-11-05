import { css } from "@emotion/css"

import type { StageMonth } from "@/app/(layout)/manage/course-plans/[id]/schedule/scheduleMappers"
import type { CourseDesignerStage } from "@/generated/api/types.generated"
import { tones, withAlpha } from "@/shared-module/components/styles/themes"

export const STAGE_ACCENTS: Record<CourseDesignerStage, string> = {
  Analysis: tones.toneAccent21,
  Design: tones.toneAccent21,
  Development: tones.toneAccent21,
  Implementation: tones.toneAccent21,
  Evaluation: tones.toneAccent21,
}

/** Month key for timeline comparisons. */
export function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

export interface StageTimelineTabItem {
  key: CourseDesignerStage
  label: string
  isCompleted: boolean
  isCurrent: boolean
  months: StageMonth[]
}

export const tabBandBaseStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 80px;
  padding: 0.35rem 0.5rem 0.45rem;
  border-radius: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition:
    background 140ms ease,
    box-shadow 140ms ease,
    transform 120ms ease;
  text-align: left;
`

export const tabBandUnselectedStyles = css`
  &:hover {
    background: ${tones.toneNeutral19};
    border-radius: 10px;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px var(--tone-shadow-info-7);
  }
`

export const tabBandSelectedStyles = (accent: string) => css`
  background: ${withAlpha(accent, 12.55)};
  box-shadow:
    0 2px 6px var(--tone-shadow-info-8),
    0 1px 3px var(--tone-shadow-info-5);
  border-bottom: 3px solid ${accent};
  border-radius: 8px 8px 0 0;
`

export const tabBandFocusRingStyles = css`
  outline: 2px solid ${tones.toneAccent19};
  outline-offset: 2px;
`

export const tabBandDividerStyles = css`
  position: relative;

  &:not(:first-of-type)::before {
    content: "";
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: -8px;
    width: 1px;
    background: ${tones.toneNeutral35};
  }
`

export const stagePillStyles = css`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  border-radius: 999px;
  padding: 0.2rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  background: ${tones.toneNeutral29};
  border: 1px solid ${tones.toneNeutral37};
  white-space: nowrap;
  line-height: 1;
`

export const stagePillSelectedStyles = (accent: string) => css`
  background: ${accent};
  border-color: ${accent};
  color: var(--color-text-on-accent);
  box-shadow:
    0 1px 4px var(--tone-shadow-info-11),
    0 0 0 1px ${withAlpha(accent, 20)};
`

export const stagePillCompletedStyles = css`
  background: ${tones.toneNeutral14};
  border-color: ${tones.toneNeutral35};
  color: ${tones.toneNeutral41};
`

export const stagePillFutureStyles = (accent: string) => css`
  border-color: ${withAlpha(accent, 50.2)};
  color: ${withAlpha(accent, 70.2)};
`

export const stageMonthsRowStyles = css`
  display: flex;
  align-items: stretch;
  gap: 6px;
`

export const monthDimmedStyles = css`
  opacity: 0.75;
`

export const activeStageDotStyles = css`
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: ${tones.toneAccent19};
  flex-shrink: 0;
  margin-right: 0.3rem;

  &::after {
    content: "";
    position: absolute;
    inset: -5px;
    border-radius: inherit;
    border: 1px solid var(--tone-border-accent-3);
    opacity: 0;
    transform: scale(0.9);
    animation: workspace-timeline-tab-pulse 2s ease-out infinite;
  }

  @keyframes workspace-timeline-tab-pulse {
    0% {
      opacity: 0.5;
      transform: scale(0.9);
    }
    70% {
      opacity: 0;
      transform: scale(1.4);
    }
    100% {
      opacity: 0;
      transform: scale(1.4);
    }
  }
`

export const completedStageCheckStyles = css`
  display: inline-block;
  width: 9px;
  height: 9px;
  border-bottom: 2px solid currentColor;
  border-left: 2px solid currentColor;
  transform: translateY(-1px) rotate(-45deg);
  transform-origin: center;
`
