"use client"

import { css } from "@emotion/css"
import { format } from "date-fns"
import { motion } from "motion/react"
import { forwardRef } from "react"

import { COURSE_PLAN_MONTH_ICONS } from "@/app/(layout)/manage/course-plans/monthIcons"

import type { StageMonth } from "../scheduleMappers"

const stageMonthBlockStyles = css`
  min-width: 84px;
  border-radius: 12px;
  border: 1px solid var(--tone-border-neutral-30);
  background: var(--color-surface);
  padding: 0.6rem 0.65rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  box-shadow: 0 2px 8px var(--tone-shadow-neutral-4);
`

const stageMonthBlockMonthStyles = css`
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--tone-fg-info-13);
  line-height: 1.1;
`

const stageMonthBlockYearStyles = css`
  font-size: 0.72rem;
  color: var(--tone-fg-neutral-17);
  line-height: 1.1;
`

const stageMonthBlockIconStyles = css`
  width: 18px;
  height: 18px;
  color: var(--tone-fg-accent-6);
  display: flex;
  align-items: center;
  justify-content: center;
`

interface MonthBlockProps {
  month: StageMonth
  reduceMotion: boolean
  layoutId: string
}

const MonthBlock = forwardRef<HTMLDivElement, MonthBlockProps>(function MonthBlock(
  { month, reduceMotion, layoutId },
  ref,
) {
  const MonthIcon = COURSE_PLAN_MONTH_ICONS[month.date.getMonth()] ?? COURSE_PLAN_MONTH_ICONS[0]

  return (
    <motion.div
      ref={ref}
      layout
      layoutId={layoutId}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={stageMonthBlockStyles} title={month.label}>
        <div className={stageMonthBlockIconStyles}>
          <MonthIcon />
        </div>
        <span className={stageMonthBlockMonthStyles}>{format(month.date, "MMMM")}</span>
        <span className={stageMonthBlockYearStyles}>{format(month.date, "yyyy")}</span>
      </div>
    </motion.div>
  )
})

export default MonthBlock
