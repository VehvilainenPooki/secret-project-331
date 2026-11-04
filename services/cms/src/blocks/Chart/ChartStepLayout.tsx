"use client"

import { css } from "@emotion/css"
import React from "react"

import { fontWeights, primaryFont } from "@/shared-module/common/styles"
import { useTranslation } from "@/utils/useCmsTranslation"
import { tones } from "@/shared-module/components/styles/themes"

const stepLayoutStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`

const stepCounterStyles = css`
  margin: 0;
  font-family: ${primaryFont};
  font-size: 0.8125rem;
  font-weight: ${fontWeights.medium};
  color: ${tones.toneNeutral41};
`

export const stepInstructionStyles = css`
  margin: 0;
  font-family: ${primaryFont};
  font-size: 0.9375rem;
  color: ${tones.toneNeutral46};
`

// Keeps a step's buttons at their natural width inside the column layout.
export const stepActionsStyles = css`
  display: flex;
`

interface ChartStepLayoutProps {
  /** Position in the guided flow; the counter is left out when the step has none. */
  stepNumber: number | null
  stepCount: number
}

/** The column the guided steps before the editor are laid out in, with their "step x of y" counter. */
const ChartStepLayout: React.FC<React.PropsWithChildren<ChartStepLayoutProps>> = ({
  stepNumber,
  stepCount,
  children,
}) => {
  const { t } = useTranslation()
  return (
    <div className={stepLayoutStyles}>
      {stepNumber !== null && (
        <p className={stepCounterStyles}>
          {t("step-x-of-y", { current: stepNumber, total: stepCount })}
        </p>
      )}
      {children}
    </div>
  )
}

export default ChartStepLayout
