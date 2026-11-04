"use client"

import { css } from "@emotion/css"
import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"

import type { ExerciseStatusSummaryForUser } from "@/generated/api/types.generated"
import { exerciseAnswersRequiringAttentionRoute } from "@/shared-module/common/utils/routes"
import { Link } from "@/shared-module/components"
import { tones } from "@/shared-module/components/styles/themes"

const Section = styled.section`
  margin: 2rem 0;
`

const Card = styled.div`
  background: ${tones.toneWarning3};
  border: 1px solid ${tones.toneWarning8};
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
`

const List = styled.ul`
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Item = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  padding: 0.5rem 0;
  border-top: 1px solid ${tones.toneWarning6};
`

interface AnswersInManualReviewSectionProps {
  exerciseStatusSummaries: ExerciseStatusSummaryForUser[]
}

const AnswersInManualReviewSection: React.FC<AnswersInManualReviewSectionProps> = ({
  exerciseStatusSummaries,
}) => {
  const { t } = useTranslation()
  // Requires a submission too: without one the linked grading page has nothing to show, so
  // listing the exercise here would send staff to an empty page.
  const inManualReview = exerciseStatusSummaries.filter(
    (summary) =>
      summary.user_exercise_state?.reviewing_stage === "WaitingForManualGrading" &&
      summary.exercise_slide_submissions.length > 0,
  )
  if (inManualReview.length === 0) {
    return null
  }
  return (
    <Section>
      <h2
        className={css`
          margin-bottom: 1.5rem;
          color: ${tones.toneNeutral46};
          font-size: 1.5rem;
        `}
      >
        {t("answers-in-manual-review")}
      </h2>
      <Card>
        <p
          className={css`
            margin: 0;
            color: ${tones.toneNeutral46};
          `}
        >
          {t("answers-in-manual-review-explanation")}
        </p>
        <List>
          {inManualReview.map((summary) => (
            <Item key={summary.exercise.id}>
              <span
                className={css`
                  color: ${tones.toneNeutral46};
                  font-weight: 600;
                `}
              >
                {summary.exercise.name}
              </span>
              <Link
                href={exerciseAnswersRequiringAttentionRoute(summary.exercise.id)}
                className={css`
                  color: ${tones.toneInfo23};
                  white-space: nowrap;
                `}
              >
                {t("link-view-answers-requiring-attention")}
              </Link>
            </Item>
          ))}
        </List>
      </Card>
    </Section>
  )
}

export default AnswersInManualReviewSection
