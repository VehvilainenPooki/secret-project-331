"use client"

import { css } from "@emotion/css"
import { format } from "date-fns"

import { COURSE_PLAN_MONTH_ICONS } from "@/app/(layout)/manage/course-plans/monthIcons"
import { tones } from "@/shared-module/components/styles/themes"

import type { StageMonth } from "../../schedule/scheduleMappers"

const timelineMonthBlockStyles = css`
  min-width: 84px;
  border-radius: 12px;
  border: 1px solid ${tones.toneNeutral35};
  background: ${tones.toneNeutral1};
  padding: 0.6rem 0.65rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  box-shadow: 0 2px 8px var(--tone-shadow-neutral-4);
`

const timelineMonthBlockMonthStyles = css`
  font-size: 0.78rem;
  font-weight: 700;
  color: ${tones.toneNeutral44};
  line-height: 1.1;
`

const timelineMonthBlockYearStyles = css`
  font-size: 0.72rem;
  color: ${tones.toneNeutral39};
  line-height: 1.1;
`

const timelineMonthBlockIconStyles = css`
  width: 18px;
  height: 18px;
  color: ${tones.toneAccent21};
  display: flex;
  align-items: center;
  justify-content: center;
`

interface TimelineMonthBlockProps {
  month: StageMonth
}

export default function TimelineMonthBlock({ month }: TimelineMonthBlockProps) {
  const MonthIcon = COURSE_PLAN_MONTH_ICONS[month.date.getMonth()] ?? COURSE_PLAN_MONTH_ICONS[0]

  return (
    <div className={timelineMonthBlockStyles} title={month.label}>
      <div className={timelineMonthBlockIconStyles}>
        <MonthIcon />
      </div>
      <span className={timelineMonthBlockMonthStyles}>{format(month.date, "MMMM")}</span>
      <span className={timelineMonthBlockYearStyles}>{format(month.date, "yyyy")}</span>
    </div>
  )
}
