"use client"

import { css } from "@emotion/css"
import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"

import { useCourseInstanceProgress } from "@/hooks/useCourseInstanceProgress"
import { useCourseStructure } from "@/hooks/useCourseStructure"
import DebugModal from "@/shared-module/common/components/DebugModal"
import { QueryResults, ErrorNotice } from "@/shared-module/components"
import { tones } from "@/shared-module/components/styles/themes"

const Section = styled.section`
  margin: 2rem 0;
`

const ModuleCard = styled.div`
  background: var(--color-surface);
  border: 1px solid ${tones.toneNeutral22};
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 0.125rem 0.25rem var(--tone-shadow-neutral-6);
`

const ModuleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${tones.toneNeutral22};
`

const ModuleTitle = styled.h3`
  margin: 0;
  color: ${tones.toneNeutral46};
  font-size: 1.25rem;
  font-weight: 600;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15.625rem, 1fr));
  gap: 1.5rem;
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: ${tones.toneNeutral12};
  border-radius: 0.5rem;
  border: 1px solid ${tones.toneNeutral22};
`

const Label = styled.span`
  color: ${tones.toneNeutral41};
  font-size: 0.875rem;
  font-weight: 500;
`

const Value = styled.span`
  color: ${tones.toneNeutral46};
  font-size: 1.125rem;
  font-weight: 600;
`

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 0.5rem;
  background: ${tones.toneNeutral26};
  border-radius: 0.25rem;
  overflow: hidden;
  margin-top: 0.5rem;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${(props) => props.progress}%;
    background: ${(props) =>
      props.progress >= 100
        ? tones.toneAccent19
        : props.progress >= 50
          ? tones.toneAccent16
          : tones.toneAccent12};
    transition: width 0.3s ease;
  }
`

const ProgressValue = styled.span`
  color: ${tones.toneNeutral46};
  font-size: 0.875rem;
  font-weight: 500;
`

interface CourseInstanceProgressSectionProps {
  userId: string
  courseId: string
}

const CourseInstanceProgressSection: React.FC<CourseInstanceProgressSectionProps> = ({
  userId,
  courseId,
}) => {
  const { t } = useTranslation()
  const courseStructure = useCourseStructure(courseId)
  const courseInstanceProgresses = useCourseInstanceProgress(courseId, userId)

  const heading = (
    <h2
      className={css`
        margin-bottom: 1.5rem;
        color: ${tones.toneNeutral46};
        font-size: 1.75rem;
        font-weight: 600;
      `}
    >
      {t("label-progressing")}
    </h2>
  )

  return (
    <QueryResults
      queries={[courseInstanceProgresses, courseStructure] as const}
      emptyFallback={
        <Section>
          {heading}
          <p
            className={css`
              color: ${tones.toneNeutral41};
              font-size: 1rem;
              padding: 1.5rem;
              background: ${tones.toneNeutral12};
              border: 1px solid ${tones.toneNeutral22};
              border-radius: 0.5rem;
              text-align: center;
            `}
          >
            {t("no-data")}
          </p>
        </Section>
      }
      renderData={([courseInstanceProgressesData, courseStructureData]) => {
        if (!courseStructureData) {
          return <ErrorNotice error={new Error("Course structure not found")} />
        }

        const isSingleModule = courseInstanceProgressesData.length === 1

        return (
          <Section>
            {heading}
            {courseInstanceProgressesData.map((courseInstanceProgress) => {
              const courseModule = courseStructureData.modules.find(
                (cm) => cm.id === courseInstanceProgress.course_module_id,
              )
              const pointsProgress = courseInstanceProgress.score_maximum
                ? (courseInstanceProgress.score_given / courseInstanceProgress.score_maximum) * 100
                : 0
              const exercisesProgress = courseInstanceProgress.total_exercises
                ? ((courseInstanceProgress.attempted_exercises ?? 0) /
                    courseInstanceProgress.total_exercises) *
                  100
                : 0

              return (
                <ModuleCard key={courseInstanceProgress.course_module_id}>
                  <ModuleHeader>
                    {!isSingleModule && (
                      <ModuleTitle>{courseModule?.name ?? t("default-module")}</ModuleTitle>
                    )}
                    <DebugModal data={courseInstanceProgress} variant="minimal" />
                  </ModuleHeader>
                  <InfoGrid>
                    {courseInstanceProgress.attempted_exercises_required !== null && (
                      <InfoItem>
                        <Label>{t("label-attempted-exercises-required")}</Label>
                        <Value>{courseInstanceProgress.attempted_exercises_required}</Value>
                      </InfoItem>
                    )}
                    {courseInstanceProgress.score_required !== null && (
                      <InfoItem>
                        <Label>{t("label-points-required")}</Label>
                        <Value>{courseInstanceProgress.score_required}</Value>
                      </InfoItem>
                    )}
                    <InfoItem>
                      <Label>{t("label-points")}</Label>
                      <Value>
                        {courseInstanceProgress.score_given} /{" "}
                        {courseInstanceProgress.score_maximum ?? 0}
                      </Value>
                      <ProgressBar progress={pointsProgress} />
                      <ProgressValue>{Math.round(pointsProgress)}%</ProgressValue>
                    </InfoItem>
                    <InfoItem>
                      <Label>{t("label-attempted-exercises")}</Label>
                      <Value>
                        {courseInstanceProgress.attempted_exercises ?? 0} /{" "}
                        {courseInstanceProgress.total_exercises ?? 0}
                      </Value>
                      <ProgressBar progress={exercisesProgress} />
                      <ProgressValue>{Math.round(exercisesProgress)}%</ProgressValue>
                    </InfoItem>
                  </InfoGrid>
                </ModuleCard>
              )
            })}
          </Section>
        )
      }}
    />
  )
}

export default CourseInstanceProgressSection
