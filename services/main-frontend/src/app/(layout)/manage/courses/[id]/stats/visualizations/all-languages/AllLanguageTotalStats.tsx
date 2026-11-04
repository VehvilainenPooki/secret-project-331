"use client"

import { css } from "@emotion/css"
import React from "react"
import { useTranslation } from "react-i18next"

import {
  useTotalUsersCompletedCourseQuery,
  useTotalUsersReturnedExercisesQuery,
  useTotalUsersStartedAllLanguageVersionsQuery,
} from "@/hooks/stats"
import { formatNumber } from "@/shared-module/common/utils/numbers"
import withErrorBoundary from "@/shared-module/common/utils/withErrorBoundary"
import { ErrorNotice } from "@/shared-module/components"
import { tones } from "@/shared-module/components/styles/themes"

interface AllLanguageTotalStatsProps {
  courseId: string
}

const statBoxStyles = css`
  flex: 1;
  max-width: 300px;
  border: 3px solid ${tones.toneNeutral22};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  background: var(--color-surface);
  box-shadow: 0 2px 4px var(--tone-shadow-neutral-6);
`

const statValueStyles = css`
  font-size: 2.8rem;
  font-weight: bold;
  color: ${tones.toneAccent21};
  margin-bottom: 0.5rem;
`

const statTitleStyles = css`
  margin: 0;
  color: ${tones.toneNeutral46};
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const loadingValueStyles = css`
  @keyframes pulse {
    0%,
    100% {
      background-color: ${tones.toneNeutral35};
    }
    50% {
      background-color: ${tones.toneNeutral37};
    }
  }

  height: 67.2px;
  width: 120px;
  margin: 0 auto 0.5rem;
  border-radius: 4px;
  background-color: var(--color-surface);
  animation: pulse 1.5s ease-in-out infinite;
  animation-delay: 500ms;
`

const AllLanguageTotalStats: React.FC<React.PropsWithChildren<AllLanguageTotalStatsProps>> = ({
  courseId,
}) => {
  const { t, i18n } = useTranslation()
  const totalUsersQuery = useTotalUsersStartedAllLanguageVersionsQuery(courseId)
  const totalCompletionsQuery = useTotalUsersCompletedCourseQuery(courseId)
  const totalReturnedExercisesQuery = useTotalUsersReturnedExercisesQuery(courseId)

  const hasError =
    totalUsersQuery.error || totalCompletionsQuery.error || totalReturnedExercisesQuery.error
  const isLoading =
    totalUsersQuery.isLoading ||
    totalCompletionsQuery.isLoading ||
    totalReturnedExercisesQuery.isLoading

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 3rem;
        margin-bottom: 2rem;
      `}
    >
      {hasError ? (
        <ErrorNotice
          error={
            totalUsersQuery.error ||
            totalCompletionsQuery.error ||
            totalReturnedExercisesQuery.error
          }
        />
      ) : (
        <div
          className={css`
            display: flex;
            gap: 2rem;
            justify-content: center;
            flex-wrap: wrap;
          `}
        >
          <div className={statBoxStyles}>
            {isLoading ? (
              <div className={loadingValueStyles} />
            ) : (
              <div className={statValueStyles}>
                {formatNumber(totalUsersQuery.data?.count || 0, i18n.language)}
              </div>
            )}
            <h3 className={statTitleStyles}>{t("stats-heading-students-started-the-course")}</h3>
          </div>

          <div className={statBoxStyles}>
            {isLoading ? (
              <div className={loadingValueStyles} />
            ) : (
              <div className={statValueStyles}>
                {formatNumber(totalReturnedExercisesQuery.data?.count || 0, i18n.language)}
              </div>
            )}
            <h3 className={statTitleStyles}>{t("stats-heading-students-returned-exercises")}</h3>
          </div>

          <div className={statBoxStyles}>
            {isLoading ? (
              <div className={loadingValueStyles} />
            ) : (
              <div className={statValueStyles}>
                {formatNumber(totalCompletionsQuery.data?.count || 0, i18n.language)}
              </div>
            )}
            <h3 className={statTitleStyles}>{t("stats-heading-students-completed-the-course")}</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default withErrorBoundary(AllLanguageTotalStats)
