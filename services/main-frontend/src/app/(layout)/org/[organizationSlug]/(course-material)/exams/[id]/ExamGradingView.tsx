"use client"

import { css } from "@emotion/css"
import { useTranslation } from "react-i18next"

import type { ExamData } from "@/generated/course-material-api/types.generated"
import { headingFont, primaryFont } from "@/shared-module/common/styles"
import { tones } from "@/shared-module/components/styles/themes"

export interface ExamGradingViewProps {
  examData: ExamData
}

/** Renders grading list when enrollment_data is StudentCanViewGrading. */
export default function ExamGradingView({ examData }: ExamGradingViewProps) {
  const { t } = useTranslation()
  if (examData.enrollment_data.tag !== "StudentCanViewGrading") {
    return null
  }
  const { gradings } = examData.enrollment_data
  const cardClass = css`
    display: flex;
    flex-direction: column;
    background: ${tones.toneNeutral22};
    border: 1px solid ${tones.toneNeutral26};
    border-radius: 8px;
    padding: 1rem 1.25rem;
    margin: 1rem 0;
    font-family: ${headingFont};
    font-size: 1.125rem;
    color: ${tones.toneNeutral46};
  `
  const pointsClass = css`
    font-family: ${primaryFont};
  `
  const feedbackLabelClass = css`
    font-family: ${primaryFont};
    color: ${tones.toneNeutral44};
    font-size: 1rem;
    padding-top: 1rem;
  `
  const feedbackBoxClass = css`
    background: ${tones.toneNeutral1};
    color: ${tones.toneNeutral44};
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid ${tones.toneNeutral26};
    margin-top: 0.5rem;
    font-family: ${primaryFont};
  `
  return (
    <>
      {gradings.map(
        (grade) =>
          !grade[0].hidden && (
            <div key={grade[0].id} className={cardClass}>
              <div>
                {t("label-name")}: {grade[1].name}
              </div>
              <div className={pointsClass}>
                {t("points")}: {grade[0].score_given} / {grade[1].score_maximum}
              </div>
              <div className={feedbackLabelClass}>
                {t("label-feedback")}:
                <div className={feedbackBoxClass}>{grade[0].justification}</div>
              </div>
            </div>
          ),
      )}
    </>
  )
}
