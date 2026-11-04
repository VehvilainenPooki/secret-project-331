"use client"

import { css } from "@emotion/css"
import type { TFunction } from "i18next"
import React from "react"
import { useTranslation } from "react-i18next"

import type { ManualCompletionPreviewUser } from "@/generated/api/types.generated"
import { tones } from "@/shared-module/components/styles/themes"

export interface PreviewUserListProps {
  users: ManualCompletionPreviewUser[]
}

/**
 * Where a pass and a fail with no numeric grade sit on `previous_best_grade`'s numeric scale.
 * Whoever fills that field encodes it this way; `formatGrade` below is the only decoder.
 */
export const PASS_GRADE_VALUE = 0.5
export const FAIL_GRADE_VALUE = -1

const PreviewUserList: React.FC<PreviewUserListProps> = ({ users }) => {
  const { t } = useTranslation()

  const mapGradeToText = (grade: number | null | undefined, passed: boolean): string => {
    if (grade !== null && grade !== undefined) {
      return grade.toString()
    }
    return passed ? t("label-passed") : t("label-not-passed")
  }

  return (
    <div
      className={css`
        padding: 1rem;
        background-color: ${tones.toneNeutral12};
        border-radius: 8px;
      `}
    >
      <ul
        className={css`
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        `}
      >
        {users.map((user) => (
          <li
            key={user.user_id}
            className={css`
              padding: 0.75rem 1rem;
              background-color: ${tones.toneNeutral1};
              border-radius: 6px;
              border: 1px solid ${tones.toneNeutral26};
              display: flex;
              justify-content: space-between;
              align-items: center;
              transition: all 0.2s ease;
              box-shadow: 0 1px 3px var(--tone-shadow-neutral-6);

              &:hover {
                background-color: ${tones.toneNeutral12};
                transform: translateX(4px);
                box-shadow: 0 2px 4px var(--tone-shadow-neutral-10);
              }
            `}
          >
            <div
              className={css`
                display: flex;
                align-items: center;
                gap: 0.5rem;
              `}
            >
              <span
                className={css`
                  font-weight: 500;
                  color: ${tones.toneNeutral46};
                `}
              >
                {user.first_name} {user.last_name}
              </span>
              <span
                className={css`
                  font-size: 14px;
                  color: ${tones.toneNeutral41};
                  padding-left: 0.5rem;
                  border-left: 1px solid ${tones.toneNeutral26};
                `}
              >
                {t("user-id")}: {user.user_id}
              </span>
            </div>

            <div
              className={css`
                display: flex;
                align-items: center;
                gap: 0.5rem;
              `}
            >
              <span
                className={css`
                  font-size: 14px;
                  color: ${tones.toneNeutral41};
                  padding-right: 0.5rem;
                  border-right: 1px solid ${tones.toneNeutral26};
                `}
              >
                {t("label-previous-grade")}: {formatGrade(user.previous_best_grade, t)}
              </span>

              <div
                className={css`
                  margin-left: auto;
                  padding: 0.25rem 0.75rem;
                  background-color: ${user.passed ? tones.toneAccent7 : tones.toneDanger2};
                  color: ${user.passed ? tones.toneAccent21 : tones.toneDanger17};
                  border-radius: 4px;
                  font-weight: 500;
                  border: 1px solid ${user.passed ? tones.toneAccent9 : tones.toneDanger7};
                `}
                aria-label={`${t("label-new-grade")} ${mapGradeToText(user.grade, user.passed)}`}
              >
                {mapGradeToText(user.grade, user.passed)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PreviewUserList

function formatGrade(grade: number | null | undefined, t: TFunction): string {
  if (grade === null || grade === undefined) {
    return "-"
  }
  if (grade === FAIL_GRADE_VALUE) {
    return t("label-not-passed")
  }
  if (grade === PASS_GRADE_VALUE) {
    return t("label-passed")
  }
  return grade.toString()
}
