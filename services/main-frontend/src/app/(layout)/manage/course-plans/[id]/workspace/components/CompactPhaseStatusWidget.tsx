"use client"

import { css } from "@emotion/css"
import { useTranslation } from "react-i18next"

import { tones } from "@/shared-module/components/styles/themes"

const widgetCardStyles = css`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  background: var(--color-surface);
  border: 1px solid ${tones.toneNeutral35};
  box-shadow: none;
  cursor: pointer;
  transition:
    background 120ms ease,
    border-color 120ms ease;
  text-align: left;

  :hover {
    border-color: ${tones.toneNeutral37};
  }
`

const phaseNameStyles = css`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${tones.toneNeutral48};
  margin: 0;
`

const statusLineStyles = css`
  font-size: 0.85rem;
  color: ${tones.toneNeutral44};
  margin: 0;
`

const statusLineUrgentStyles = css`
  color: ${tones.toneDanger21};
`

const tasksLineStyles = css`
  font-size: 0.8rem;
  color: ${tones.toneNeutral41};
  margin: 0;
`

const viewPlanLinkStyles = css`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${tones.toneAccent23};
  margin-top: 0.25rem;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

export interface CompactPhaseStatusWidgetProps {
  phaseName: string
  statusTimeLine: string
  tasksRemainingCount: number
  isUrgent: boolean
  onClick: () => void
}

/** Compact status summary: phase name, status + time, tasks remaining, View plan link. */
export default function CompactPhaseStatusWidget({
  phaseName,
  statusTimeLine,
  tasksRemainingCount,
  isUrgent,
  onClick,
}: CompactPhaseStatusWidgetProps) {
  const { t } = useTranslation()

  const tasksText =
    tasksRemainingCount === 1
      ? t("course-plans-task-remaining", { count: 1 })
      : t("course-plans-tasks-remaining", { count: tasksRemainingCount })

  return (
    <button
      type="button"
      onClick={onClick}
      className={widgetCardStyles}
      aria-label={t("course-plans-view-plan")}
    >
      <span className={phaseNameStyles}>{phaseName}</span>
      <span className={`${statusLineStyles} ${isUrgent ? statusLineUrgentStyles : ""}`}>
        {statusTimeLine}
      </span>
      {tasksRemainingCount >= 0 && <span className={tasksLineStyles}>{tasksText}</span>}
      <span className={viewPlanLinkStyles}>{t("course-plans-view-plan")}</span>
    </button>
  )
}
