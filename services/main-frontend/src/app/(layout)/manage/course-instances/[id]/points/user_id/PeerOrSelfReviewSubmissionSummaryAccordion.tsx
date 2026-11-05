"use client"

import { css } from "@emotion/css"
import { useTranslation } from "react-i18next"

import { UserDisplay } from "@/components/UserDisplay"
import type {
  PeerOrSelfReviewQuestion,
  PeerOrSelfReviewQuestionSubmission,
  PeerOrSelfReviewSubmissionWithSubmissionOwner,
} from "@/generated/api/types.generated"
import HideTextInSystemTests from "@/shared-module/common/components/system-tests/HideTextInSystemTests"
import { Disclosure, Link } from "@/shared-module/components"
import { tones } from "@/shared-module/components/styles/themes"

export interface PeerOrSelfReviewSubmissionSummaryAccordionProps {
  peerOrSelfReviewSubmission: PeerOrSelfReviewSubmissionWithSubmissionOwner
  peerOrSelfReviewQuestionSubmissions: PeerOrSelfReviewQuestionSubmission[]
  peerOrSelfReviewQuestions: PeerOrSelfReviewQuestion[]
  showSubmissionBeingReviewed?: boolean
}

const questionLabelClass = css`
  color: ${tones.toneNeutral46};
  font-weight: 500;
`
const numberBadgeClass = css`
  padding: 0.05rem 0.4rem;
  border-radius: 3px;
  background: ${tones.toneAccent7};
  color: ${tones.toneAccent23};
  font-weight: 600;
`

const PeerOrSelfReviewSubmissionSummaryAccordion = ({
  peerOrSelfReviewSubmission,
  peerOrSelfReviewQuestionSubmissions,
  showSubmissionBeingReviewed,
  peerOrSelfReviewQuestions,
}: PeerOrSelfReviewSubmissionSummaryAccordionProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={css`
        margin: 0.3rem 0;
      `}
    >
      <Disclosure
        className={css`
          border-color: ${tones.toneAccent9};
          background: ${tones.toneAccent2};
          font-size: 0.8rem;
        `}
        title={
          <>
            {t("peer-review-submission-id")}:{" "}
            <HideTextInSystemTests
              text={peerOrSelfReviewSubmission.id}
              testPlaceholder="00000000-0000-0000-0000-000000000000"
            />
          </>
        }
      >
        <div
          className={css`
            padding: 0.6rem 0.75rem;
            font-size: 0.8rem;
          `}
        >
          <div
            className={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex-wrap: wrap;
              gap: 0.4rem;
              margin-bottom: 0.5rem;
            `}
          >
            <UserDisplay
              userId={
                peerOrSelfReviewSubmission.submission_owner_user_id ??
                peerOrSelfReviewSubmission.user_id
              }
              courseId={peerOrSelfReviewSubmission.course_id}
            />
            {showSubmissionBeingReviewed && (
              <span
                className={css`
                  color: ${tones.toneNeutral44};
                `}
              >
                {t("label-submission-being-reviewed")}:{" "}
                <Link
                  href={`/submissions/${peerOrSelfReviewSubmission.exercise_slide_submission_id}`}
                  className={css`
                    color: ${tones.toneInfo23};
                    text-decoration: none;
                    &:hover {
                      text-decoration: underline;
                    }
                  `}
                >
                  <HideTextInSystemTests
                    text={peerOrSelfReviewSubmission.exercise_slide_submission_id}
                    testPlaceholder="00000000-0000-0000-0000-000000000000"
                  />
                </Link>
              </span>
            )}
          </div>

          <div
            className={css`
              display: flex;
              flex-direction: column;
              gap: 0.4rem;
            `}
          >
            {peerOrSelfReviewQuestionSubmissions.map((prqs) => {
              const peerOrSelfReviewQuestion = peerOrSelfReviewQuestions.find(
                (prq) => prq.id === prqs.peer_or_self_review_question_id,
              )
              const hasNumber = prqs.number_data !== null
              const hasText = prqs.text_data !== null
              return (
                <div key={prqs.id}>
                  {hasNumber && !hasText && (
                    <div
                      className={css`
                        display: flex;
                        align-items: baseline;
                        gap: 0.5rem;
                      `}
                    >
                      <span className={questionLabelClass}>
                        {peerOrSelfReviewQuestion?.question}
                      </span>
                      <span className={numberBadgeClass}>{prqs.number_data}</span>
                    </div>
                  )}
                  {hasText && (
                    <div>
                      {hasNumber && (
                        <div
                          className={css`
                            display: flex;
                            align-items: baseline;
                            gap: 0.5rem;
                            margin-bottom: 0.25rem;
                          `}
                        >
                          <span className={questionLabelClass}>
                            {peerOrSelfReviewQuestion?.question}
                          </span>
                          <span className={numberBadgeClass}>{prqs.number_data}</span>
                        </div>
                      )}
                      {!hasNumber && (
                        <div
                          className={css`
                            margin-bottom: 0.2rem;
                          `}
                        >
                          <span className={questionLabelClass}>
                            {peerOrSelfReviewQuestion?.question}
                          </span>
                        </div>
                      )}
                      <div
                        className={css`
                          padding: 0.4rem 0.5rem;
                          background: ${tones.toneNeutral1};
                          border: 1px solid ${tones.toneNeutral22};
                          border-radius: 3px;
                          color: ${tones.toneNeutral44};
                          line-height: 1.5;
                          white-space: pre-wrap;
                        `}
                      >
                        {prqs.text_data}
                      </div>
                    </div>
                  )}
                  {!hasNumber && !hasText && (
                    <span className={questionLabelClass}>{peerOrSelfReviewQuestion?.question}</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Disclosure>
    </div>
  )
}

export default PeerOrSelfReviewSubmissionSummaryAccordion
