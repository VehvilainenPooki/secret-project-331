"use client"

import { css } from "@emotion/css"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import type { CourseManagementPagesProps } from "@/app/(layout)/manage/courses/[id]/types"
import { getCourseLanguageVersionsQueryKey } from "@/hooks/useCourseLanguageVersions"
import { useCourseQuery } from "@/hooks/useCourseQuery"
import { queryClient } from "@/shared-module/common/services/appQueryClient"
import { headingFont } from "@/shared-module/common/styles"
import { Button, QueryResult } from "@/shared-module/components"
import { tones } from "@/shared-module/components/styles/themes"

import CourseLanguageVersionsList from "./CourseLanguageVersionsList"
import NewCourseLanguageVersionDialog from "./NewCourseLanguageVersionDialog"

const CourseLanguageVersionsPage: React.FC<React.PropsWithChildren<CourseManagementPagesProps>> = ({
  courseId,
}) => {
  const { t } = useTranslation()
  const [showNewLanguageVersionForm, setShowNewLanguageVersionForm] = useState(false)
  const getCourseQuery = useCourseQuery(courseId)

  const handleSuccess = async () => {
    await getCourseQuery.refetch()
    setShowNewLanguageVersionForm(false)
    queryClient.invalidateQueries({ queryKey: getCourseLanguageVersionsQueryKey(courseId) })
  }

  return (
    <QueryResult query={getCourseQuery}>
      {(course) => (
        <>
          {showNewLanguageVersionForm && (
            <NewCourseLanguageVersionDialog
              showNewLanguageVersionForm={showNewLanguageVersionForm}
              courseName={course.name}
              organizationId={course.organization_id}
              onSuccess={handleSuccess}
              onClose={() => setShowNewLanguageVersionForm(false)}
              courseId={courseId}
            />
          )}
          <h2
            className={css`
              font-size: clamp(2rem, 3.6vh, 36px);
              color: ${tones.toneNeutral46};
              font-family: ${headingFont};
              font-weight: bold;
            `}
          >
            {t("title-all-course-language-versions")}
          </h2>
          <CourseLanguageVersionsList courseId={courseId} />
          <Button
            size="medium"
            variant="primary"
            onClick={() => setShowNewLanguageVersionForm(true)}
          >
            {t("button-text-new")}
          </Button>
        </>
      )}
    </QueryResult>
  )
}

export default CourseLanguageVersionsPage
