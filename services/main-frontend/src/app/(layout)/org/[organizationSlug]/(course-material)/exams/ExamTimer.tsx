"use client"

import { css } from "@emotion/css"
import styled from "@emotion/styled"
import { CheckCircle, ClockTime } from "@vectopus/atlas-icons-react"
import { hoursToSeconds, secondsToHours, secondsToMinutes } from "date-fns"
import React from "react"
import { Trans, useTranslation } from "react-i18next"

import HideTextInSystemTests from "@/shared-module/common/components/system-tests/HideTextInSystemTests"
import { respondToOrLarger } from "@/shared-module/common/styles/respond"
import { dateToString } from "@/shared-module/common/utils/time"
import { tones } from "@/shared-module/components/styles/themes"

const TimerContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px ${tones.toneNeutral26};

  ${respondToOrLarger.sm} {
    flex-direction: row;
    flex-wrap: nowrap;
  }
`

const InfoBoxLightGreenMedium = styled.div`
  align-items: center;
  background-color: ${tones.toneAccent7};
  color: ${tones.toneAccent23};
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
  text-align: center;
  text-transform: uppercase;

  ${respondToOrLarger.sm} {
    flex-direction: row;
    text-align: left;
  }
`

const InfoBoxDarkGreenSmall = styled.div`
  padding: 0.75rem 1rem;
  flex: 1;
  background-color: ${tones.toneAccent23};
  color: var(--color-text-on-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
`

export interface ExamTimerProps {
  endsAt: Date
  maxScore?: number
  startedAt: Date
  secondsLeft: number
}

const ExamTimer: React.FC<React.PropsWithChildren<ExamTimerProps>> = ({
  endsAt,
  maxScore,
  secondsLeft,
  startedAt,
}) => {
  const { t } = useTranslation()

  const formatedStartedAt = dateToString(startedAt)
  const formatedEndsAt = dateToString(endsAt)

  return (
    <TimerContainer>
      {maxScore && (
        <InfoBoxLightGreenMedium>
          <CheckCircle
            className={css`
              color: ${tones.toneAccent9};
              margin-right: 0.5rem;
            `}
          />
          <div>
            <Trans t={t} i18nKey="max-score-n-marks">
              Max score:{" "}
              <div
                className={css`
                  color: ${tones.toneAccent7};
                  text-transform: lowercase;
                `}
              >
                {maxScore} marks
              </div>
            </Trans>
          </div>
        </InfoBoxLightGreenMedium>
      )}
      <InfoBoxLightGreenMedium>
        <ClockTime
          className={css`
            margin: 0.5rem;
          `}
        />
        <div>
          <HideTextInSystemTests
            text={t("started-at-time", { time: formatedStartedAt })}
            testPlaceholder={t("started-at-time", { time: "XXXX-XX-XX XX:XX:XX UTC+XX:XX" })}
          />
        </div>
      </InfoBoxLightGreenMedium>
      <InfoBoxLightGreenMedium>
        <HideTextInSystemTests
          text={t("ends-at-time", { time: formatedEndsAt })}
          testPlaceholder={t("ends-at-time", { time: "XXXX-XX-XX XX:XX:XX UTC+XX:XX" })}
        />
      </InfoBoxLightGreenMedium>
      <InfoBoxDarkGreenSmall>
        <HideTextInSystemTests
          text={formatTimeLeft(secondsLeft)}
          testPlaceholder={formatTimeLeft(135)}
        />
      </InfoBoxDarkGreenSmall>
    </TimerContainer>
  )
}

export default ExamTimer

/** Display as hours:minutes left, e.g. 1:03 or 120:59 */
function formatTimeLeft(secondsLeft: number) {
  if (secondsLeft <= 0) {
    return "0:00"
  }

  const hoursLeft = secondsToHours(secondsLeft)
  const minutesLeft = secondsToMinutes(secondsLeft - hoursToSeconds(hoursLeft))
  const padding = minutesLeft < 10 ? "0" : ""
  return `${hoursLeft}:${padding}${minutesLeft}`
}
