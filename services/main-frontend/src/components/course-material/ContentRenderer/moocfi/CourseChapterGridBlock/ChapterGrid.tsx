"use client"

import { css, cx } from "@emotion/css"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { CHAPTER_GRID_SCROLLING_DESTINATION_CLASSNAME_DOES_NOT_AFFECT_STYLING } from "@/components/course-material/LandingPageHeroSection"
import { getCourseMaterialChapters } from "@/generated/course-material-api/sdk.generated"
import type { ChaptersWithStatus } from "@/generated/course-material-api/types.generated"
import useTime from "@/hooks/course-material/useTime"
import { useUserChapterLocks } from "@/hooks/course-material/useUserChapterLocks"
import { headingFont, secondaryFont } from "@/shared-module/common/styles"
import { respondToOrLarger } from "@/shared-module/common/styles/respond"
import { stringToRandomNumber } from "@/shared-module/common/utils/strings"
import { QueryResult } from "@/shared-module/components"

import Grid from "./Grid"
import { tones } from "@/shared-module/components/styles/themes"

const COLORS_ARRAY = [
  "var(--tone-tone-info-23)",
  "var(--tone-tone-accent-21)",
  "var(--tone-tone-danger-21)",
  "var(--tone-tone-danger-17)",
  "var(--tone-tone-special-2)",
  "var(--tone-tone-neutral-44)",
  "var(--tone-tone-info-25)",
  "var(--tone-tone-accent-23)",
  "var(--tone-tone-neutral-46)",
  "var(--tone-tone-accent-23)",
  "var(--tone-tone-info-26)",
]

const ChapterGrid: React.FC<React.PropsWithChildren<{ courseId: string }>> = ({ courseId }) => {
  const { t } = useTranslation()
  const now = useTime()
  const getChaptersInCourse = useQuery({
    queryKey: [`course-${courseId}-chapters`],
    queryFn: (): Promise<ChaptersWithStatus> =>
      getCourseMaterialChapters({
        path: {
          course_id: courseId,
        },
      }),
  })
  const getUserLocks = useUserChapterLocks(courseId)
  const params = useParams<{ organizationSlug: string; courseSlug: string }>()
  const courseSlug = params?.courseSlug
  const organizationSlug = params?.organizationSlug

  const lockedChapterIds = useMemo(() => {
    if (!getUserLocks.data) {
      return new Set<string>()
    }

    const locked = new Set<string>()

    getUserLocks.data.forEach((status) => {
      if (status.status === "completed_and_locked" || status.status === "not_unlocked_yet") {
        locked.add(status.chapter_id)
      }
    })

    return locked
  }, [getUserLocks.data])

  return (
    <div
      className={cx(
        css`
          padding: 4em 1em;
        `,
        CHAPTER_GRID_SCROLLING_DESTINATION_CLASSNAME_DOES_NOT_AFFECT_STYLING,
      )}
    >
      <h2
        className={css`
          font-style: normal;
          font-weight: 700;
          text-align: center;
          color: ${tones.toneNeutral46};
          padding-bottom: 0.6em;
          line-height: 140%;
          font-size: clamp(30px, 3.5vw, 48px);
        `}
      >
        {t("course-overview")}
      </h2>
      {courseSlug && organizationSlug && (
        <QueryResult query={getChaptersInCourse}>
          {(data) => (
            <>
              {[...data.modules]
                .toSorted((a, b) => a.order_number - b.order_number)
                .map((module) => {
                  const randomNumber = stringToRandomNumber(module.id) % COLORS_ARRAY.length
                  const randomizedColor = COLORS_ARRAY[randomNumber]
                  return (
                    <div key={module.id}>
                      {!module.is_default && (
                        <>
                          <hr
                            className={css`
                              border: dashed 2px;
                              margin: 4rem 0rem 2rem 0rem;
                              color: var(--tone-fg-neutral-7);
                              width: 85vw;
                              text-align: center;
                              margin-left: auto;
                              margin-right: auto;

                              ${respondToOrLarger.lg} {
                                max-width: 1075px;
                              }
                            `}
                          />
                          <div
                            className={css`
                              margin: 1rem 1rem 0 1rem;
                              text-transform: uppercase;
                              font-size: 1rem;
                              font-weight: 500;
                              text-align: center;
                              font-family: ${secondaryFont};
                            `}
                          >
                            {t("additional-module")}
                          </div>
                          <div
                            className={css`
                              margin-bottom: 2rem;
                              color: ${randomizedColor};
                              font-weight: 600;
                              font-size: 2rem;
                              text-align: center;
                              opacity: 0.8;
                              font-family: ${headingFont};
                            `}
                          >
                            {module.name}
                          </div>
                        </>
                      )}
                      <Grid
                        chapters={module.chapters}
                        courseSlug={courseSlug}
                        now={now}
                        organizationSlug={organizationSlug}
                        previewable={data.is_previewable}
                        lockedChapterIds={lockedChapterIds}
                      />
                    </div>
                  )
                })}
            </>
          )}
        </QueryResult>
      )}
    </div>
  )
}

export default ChapterGrid
