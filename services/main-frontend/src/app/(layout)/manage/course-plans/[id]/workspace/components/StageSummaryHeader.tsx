"use client"

import { css } from "@emotion/css"

import { COURSE_PLAN_MONTH_ICONS } from "@/app/(layout)/manage/course-plans/monthIcons"
import BreakFromCentered from "@/shared-module/common/components/Centering/BreakFromCentered"
import { respondToOrLarger } from "@/shared-module/common/styles/respond"
import { tones } from "@/shared-module/components/styles/themes"

const stageHeaderBarStyles = css`
  display: flex;
  justify-content: flex-end;
  padding: 0 1.5rem;

  ${respondToOrLarger.xl} {
    padding: 0 3rem;
  }
`

const stageHeaderCardStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  min-width: 22rem;
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  background: var(--color-surface);
  border: 1px solid ${tones.toneNeutral35};
  box-shadow: 0 12px 25px var(--tone-shadow-info-8);
  cursor: pointer;
  transition:
    box-shadow 150ms ease,
    transform 150ms ease,
    border-color 150ms ease;

  :hover {
    box-shadow: 0 18px 35px var(--tone-shadow-info-10);
    transform: translateY(-1px);
    border-color: ${tones.toneNeutral49};
  }

  :active {
    transform: translateY(0);
    box-shadow: 0 10px 20px var(--tone-shadow-info-8);
  }
`

const stageHeaderDateBlockStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const stageHeaderMonthIconStyles = css`
  width: 20px;
  height: 20px;
  color: ${tones.toneAccent21};
  flex-shrink: 0;
`

const stagePillStyles = css`
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
  background: ${tones.toneNeutral29};
  color: ${tones.toneNeutral47};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`

const stageHeaderTextStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
`

const stageHeaderWelcomeStyles = css`
  font-size: 0.8rem;
  color: ${tones.toneNeutral41};
  margin-bottom: 0.15rem;
`

const stageHeaderPrimaryStyles = css`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${tones.toneNeutral48};
`

const stageHeaderSecondaryStyles = css`
  font-size: 0.85rem;
  color: ${tones.toneNeutral44};
`

const stageHeaderDateStyles = css`
  font-size: 0.9rem;
  color: ${tones.toneNeutral44};
  white-space: nowrap;
`

export interface StageSummaryHeaderProps {
  fullDateLabel: string
  welcomeLabel: string
  monthIndex: number
  stageLabel: string
  timeRemainingLabel: string | null
  metaLabel: string | null
  onClick: () => void
}

const StageSummaryHeader: React.FC<StageSummaryHeaderProps> = ({
  fullDateLabel,
  welcomeLabel,
  monthIndex,
  stageLabel,
  timeRemainingLabel,
  metaLabel,
  onClick,
}) => {
  const MonthIcon = COURSE_PLAN_MONTH_ICONS[monthIndex] ?? COURSE_PLAN_MONTH_ICONS[0]

  return (
    <BreakFromCentered sidebar={false}>
      <div className={stageHeaderBarStyles}>
        <button
          type="button"
          onClick={onClick}
          className={stageHeaderCardStyles}
          aria-label={timeRemainingLabel ?? stageLabel}
        >
          <div className={stageHeaderDateBlockStyles}>
            <span className={stageHeaderMonthIconStyles} aria-hidden>
              <MonthIcon />
            </span>
            <span className={stageHeaderDateStyles}>{fullDateLabel}</span>
          </div>
          <div className={stageHeaderTextStyles}>
            <span className={stageHeaderWelcomeStyles}>{welcomeLabel}</span>
            <span className={stageHeaderPrimaryStyles}>{stageLabel}</span>
            {timeRemainingLabel && (
              <span className={stageHeaderSecondaryStyles}>{timeRemainingLabel}</span>
            )}
          </div>
          {metaLabel && <span className={stagePillStyles}>{metaLabel}</span>}
        </button>
      </div>
    </BreakFromCentered>
  )
}

export default StageSummaryHeader
