"use client"

import { css } from "@emotion/css"
import { useTranslation } from "react-i18next"

import { useUserCourseProgress } from "@/hooks/useUserCourseProgress"
import { QueryResult } from "@/shared-module/components"
import { tones } from "@/shared-module/components/styles/themes"

export function CourseProgressSection({ courseId, userId }: { courseId: string; userId: string }) {
  const { t } = useTranslation()
  const progressQuery = useUserCourseProgress(courseId, userId)

  return (
    <QueryResult query={progressQuery}>
      {(progress) => (
        <div
          className={css`
            margin-top: 0.5rem;
            padding-top: 1rem;
            border-top: 2px solid ${tones.toneNeutral26};
          `}
        >
          <h4
            className={css`
              font-size: 0.75rem;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: ${tones.toneNeutral41};
              margin: 0 0 0.75rem 0;
            `}
          >
            {t("label-course-progress")}
          </h4>
          <div
            className={css`
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            `}
          >
            {progress.map((mod) => (
              <div
                key={mod.course_module_id}
                className={css`
                  padding: 0.5rem;
                  background: ${tones.toneNeutral12};
                  border-radius: 6px;
                  font-size: 0.85rem;
                `}
              >
                <div
                  className={css`
                    font-weight: 600;
                    color: ${tones.toneNeutral46};
                    margin-bottom: 0.25rem;
                  `}
                >
                  {mod.course_module_name}
                </div>
                <div
                  className={css`
                    color: ${tones.toneNeutral44};
                  `}
                >
                  {mod.score_maximum !== null && mod.score_maximum !== undefined
                    ? `${mod.score_given} / ${mod.score_maximum} ${t("label-points")}`
                    : `${mod.score_given} ${t("label-points")}`}
                  {mod.total_exercises !== null &&
                    mod.total_exercises !== undefined &&
                    mod.attempted_exercises !== null &&
                    mod.attempted_exercises !== undefined && (
                      <>
                        {/* oxlint-disable-next-line i18next/no-literal-string -- typographic separator */}
                        {" · "}
                        {mod.attempted_exercises} / {mod.total_exercises} {t("label-exercises")}
                      </>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </QueryResult>
  )
}
