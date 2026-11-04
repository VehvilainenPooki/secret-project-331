"use client"

import { css } from "@emotion/css"
import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { useProgressBar } from "react-aria"
import { useTranslation } from "react-i18next"

import { headingFont } from "@/shared-module/common/styles"
import { respondToOrLarger } from "@/shared-module/common/styles/respond"
import { Tooltip } from "@/shared-module/components"

import ChartExplanationList from "./ChartExplanationList"
import type { ChartExplanation, ChartPart } from "./progressText"
import { helpButtonCss } from "./progressTheme"
import { tones } from "@/shared-module/components/styles/themes"

const LinearProgress = styled.div<LinearProgressProps>`
  display: flex;
  background: ${tones.toneAccent7};
  border-radius: 100px;
  overflow: hidden;
  align-items: center;
  height: ${({ height }) => (height === "small" ? "16px" : "20px")};
  width: 100%;
  max-width: 290px;

  ${respondToOrLarger.sm} {
    height: ${({ height }) => (height === "small" ? "16px" : "28px")};
    width: 100%;
    max-width: none;
  }
`
interface LinearProgressFillProps {
  percentage: number
  height: string
  light?: boolean
}
interface LinearProgressProps {
  height: string
}
const LinearProgressFill = styled.div<LinearProgressFillProps>`
  height: ${({ height }) => (height === "small" ? "16px" : "20px")};
  position: absolute;
  top: 0;
  left: 0;
  transition: 1.5s ease-in-out;
  border-radius: 50px;
  width: ${(props) => props.percentage}%;
  background: ${(props) =>
    props.light ? tones.toneWarning5 : tones.toneAccent21};
  justify-content: end;

  ${respondToOrLarger.sm} {
    height: ${({ height }) => (height === "small" ? "16px" : "28px")};
  }
`

const Label = styled.div`
  min-width: 100%;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
  padding-left: 10px;

  > span:first-of-type {
    font-size: 0.8em;
    font-weight: 500;
    font-family: ${headingFont};
    color: var(--tone-fg-neutral-35);
  }
  ${respondToOrLarger.sm} {
    > span:first-of-type {
      font-size: 1.1em;
    }
  }
`

export interface ProgressBarProps {
  exercisesAttempted: number | null
  exercisesTotal: number | null
  /** Names the bar, and follows the count above it. */
  label: string
  /** Drawn in yellow under the fill; leave out when there is no threshold. */
  required?: number
  valueText: string
  explanations: ChartExplanation[]
}

const BAR_HEIGHT = "medium"

/** The exercises-attempted bar with its count above it. */
const ProgressBar: React.FC<ProgressBarProps> = ({
  exercisesAttempted,
  exercisesTotal,
  label,
  required,
  valueText,
  explanations,
}) => {
  const { t } = useTranslation()
  const height = BAR_HEIGHT
  const { progressBarProps } = useProgressBar({
    value: exercisesAttempted ?? 0,
    minValue: 0,
    maxValue: Math.max(exercisesTotal ?? 0, 1),
    valueLabel: valueText,
    "aria-label": label,
  })
  const ratio = (exercisesTotal ?? 0) > 0 ? (exercisesAttempted ?? 0) / (exercisesTotal ?? 0) : 0
  const requiredRatio = (exercisesTotal ?? 0) > 0 ? (required ?? 0) / (exercisesTotal ?? 0) : 0

  const percentage = ratio * 100
  const requiredPercentage = requiredRatio * 100
  // Make the progress bar animate from 0 when the page loads
  const [visualPercentage, setVisualPercentage] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setVisualPercentage(percentage)
    }, 100)
  }, [percentage])

  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-transform: lowercase;
      `}
    >
      <Label>
        <span className={helpAnchorCss}>
          <span aria-hidden="true">{`${exercisesAttempted ?? 0} / ${exercisesTotal ?? 0} ${label}`}</span>
          <span className={helpSlotCss}>
            <Tooltip aria-label={t("label-about-exercises-bar")} className={helpButtonCss}>
              <ChartExplanationList explanations={explanations} colors={BAR_COLORS} />
            </Tooltip>
          </span>
        </span>
      </Label>
      <LinearProgress {...progressBarProps} height={height}>
        <div
          className={css`
            width: 100%;
            position: relative;
            height: inherit;
          `}
        >
          <LinearProgressFill light percentage={requiredPercentage} height={height} />
          <LinearProgressFill percentage={visualPercentage} height={height} />
        </div>
      </LinearProgress>
    </div>
  )
}

export default ProgressBar

const BAR_COLORS: Record<ChartPart, string> = {
  given: tones.toneAccent21,
  required: tones.toneWarning5,
  max: tones.toneAccent7,
}

// The ? hangs after the count, so the count itself stays centred over the bar.
const helpAnchorCss = css`
  position: relative;
`

const helpSlotCss = css`
  position: absolute;
  top: 50%;
  left: 100%;
  margin-left: 0.4rem;
  transform: translateY(-50%);
  line-height: 0;
`
