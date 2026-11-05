"use client"

import { css } from "@emotion/css"
import styled from "@emotion/styled"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import CreditRegistrationStatusCell from "@/components/credit-registration/CreditRegistrationStatusCell"
import { useTeacherCreditRegistrations } from "@/components/credit-registration/teacherCreditRegistrations"
import { useCourseModuleCompletions } from "@/hooks/useCourseModuleCompletions"
import { useCourseStructure } from "@/hooks/useCourseStructure"
import BooleanAsText from "@/shared-module/common/components/BooleanAsText"
import DebugModal from "@/shared-module/common/components/DebugModal"
import HideTextInSystemTests from "@/shared-module/common/components/system-tests/HideTextInSystemTests"
import { dateToString } from "@/shared-module/common/utils/time"
import { ErrorNotice, QueryResults, Spinner } from "@/shared-module/components"
import { tones } from "@/shared-module/components/styles/themes"

const Section = styled.section`
  margin: 2rem 0;
`

const ModuleCard = styled.div`
  background: ${tones.toneNeutral12};
  border: 1px solid ${tones.toneNeutral22};
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 0.125rem 0.25rem var(--tone-shadow-neutral-6);
`

const ModuleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${tones.toneNeutral22};
`

const ModuleTitle = styled.h3`
  margin: 0;
  color: ${tones.toneNeutral46};
  font-size: 1.125rem;
`

const CompletionDate = styled.span`
  color: ${tones.toneNeutral41};
  font-size: 0.875rem;
`

const ReviewBanner = styled.div`
  background: ${tones.toneDanger2};
  border: 1px solid ${tones.toneDanger15};
  border-radius: 0.375rem;
  color: ${tones.toneDanger20};
  font-weight: 600;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15.625rem, 1fr));
  gap: 1rem;
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const Label = styled.span`
  color: ${tones.toneNeutral41};
  font-size: 0.875rem;
`

const Value = styled.span`
  color: ${tones.toneNeutral46};
  font-size: 1rem;
`

interface CourseModuleCompletionsSectionProps {
  userId: string
  courseId: string
}

const CourseModuleCompletionsSection: React.FC<CourseModuleCompletionsSectionProps> = ({
  userId,
  courseId,
}) => {
  const { t } = useTranslation()
  const courseModuleCompletionsQuery = useCourseModuleCompletions(courseId, userId)
  const courseStructure = useCourseStructure(courseId)
  const userIds = useMemo(() => [userId], [userId])
  const {
    byCompletionId: registrationsByCompletionId,
    error: registrationsError,
    isFetching: isFetchingRegistrations,
  } = useTeacherCreditRegistrations(courseId, userIds)

  const heading = (
    <h2
      className={css`
        margin-bottom: 1.5rem;
        color: ${tones.toneNeutral46};
        font-size: 1.5rem;
      `}
    >
      {t("label-course-module-completions")}
    </h2>
  )

  return (
    <QueryResults
      queries={[courseModuleCompletionsQuery, courseStructure] as const}
      emptyFallback={
        <Section>
          {heading}
          <p
            className={css`
              color: ${tones.toneNeutral41};
              font-size: 1rem;
            `}
          >
            {t("no-data")}
          </p>
        </Section>
      }
      renderData={([courseModuleCompletions, courseStructureData]) => (
        <Section>
          {heading}
          {isFetchingRegistrations && <Spinner size="sm" />}
          {registrationsError && <ErrorNotice error={registrationsError} />}
          {courseModuleCompletions.map((courseModuleCompletion) => {
            const courseModule = courseStructureData.modules.find(
              (cm) => cm.id === courseModuleCompletion.course_module_id,
            )
            const registration = registrationsByCompletionId.get(courseModuleCompletion.id)
            return (
              <ModuleCard key={courseModuleCompletion.id}>
                <ModuleHeader>
                  <ModuleTitle>
                    {courseModule?.name ?? t("default-module")}
                    {courseModule?.uh_course_code && ` (${courseModule.uh_course_code})`}
                  </ModuleTitle>
                  <CompletionDate>
                    <HideTextInSystemTests
                      text={dateToString(courseModuleCompletion.completion_date)}
                      testPlaceholder={dateToString(new Date(0))}
                    />
                  </CompletionDate>
                </ModuleHeader>
                {courseModuleCompletion.needs_to_be_reviewed && (
                  <ReviewBanner>{t("course-module-completion-needs-review")}</ReviewBanner>
                )}
                <InfoGrid>
                  <InfoItem>
                    <Label>{t("label-passed")}</Label>
                    <Value>
                      <BooleanAsText value={courseModuleCompletion.passed} />
                    </Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>{t("label-grade")}</Label>
                    <Value>{courseModuleCompletion.grade}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>{t("label-prerequisite-modules-completed")}</Label>
                    <Value>
                      <BooleanAsText
                        value={courseModuleCompletion.prerequisite_modules_completed}
                      />
                    </Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>{t("label-completion-language")}</Label>
                    <Value>{courseModuleCompletion.completion_language}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>{t("label-created-at")}</Label>
                    <Value>{dateToString(courseModuleCompletion.created_at)}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>{t("label-completion-registration-attempt-date")}</Label>
                    <Value>
                      {courseModuleCompletion.completion_registration_attempt_date
                        ? dateToString(courseModuleCompletion.completion_registration_attempt_date)
                        : t("label-null")}
                    </Value>
                  </InfoItem>
                  {registration && (
                    <InfoItem>
                      <Label>{t("credit-registration-column-registration")}</Label>
                      <CreditRegistrationStatusCell registration={registration} />
                    </InfoItem>
                  )}
                  {courseModuleCompletion.completion_granter_user_id && (
                    <InfoItem>
                      <Label>{t("label-completion-granter-user-id")}</Label>
                      <Value>{courseModuleCompletion.completion_granter_user_id}</Value>
                    </InfoItem>
                  )}
                </InfoGrid>
                <div
                  className={css`
                    margin-top: 1rem;
                    display: flex;
                    justify-content: flex-end;
                  `}
                >
                  <DebugModal data={courseModuleCompletion} />
                </div>
              </ModuleCard>
            )
          })}
        </Section>
      )}
    />
  )
}

export default CourseModuleCompletionsSection
