"use client"

import { css } from "@emotion/css"
import styled from "@emotion/styled"
import React from "react"
import { useTranslation } from "react-i18next"

import type { UserModuleCompletionStatus } from "@/generated/course-material-api/types.generated"
import FailedIcon from "@/img/course-material/failed-icon.svg"
import Badge from "@/img/course-material/grade-badge.svg"
import PassedIcon from "@/img/course-material/passed-icon.svg"
import { headingFont, monospaceFont, typography } from "@/shared-module/common/styles"
import { tones } from "@/shared-module/components/styles/themes"

import CongratulationsLinks from "./CongratulationsLinks"

const Wrapper = styled.div`
  font-family: ${headingFont};
  max-width: 480px;
  min-height: 100%;
  background: var(--tone-bg-accent-10);
  box-shadow: 0px 10px 20px var(--tone-shadow-accent-2);
  border-radius: 4px;
  text-align: left;
  padding: 1.5rem 1.5rem 1.8rem 1.5rem;
  position: relative;

  button {
    text-transform: capitalize;
    font-weight: 500;
  }

  h3 {
    color: var(--color-text);
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    max-width: 420px;
    line-height: 30px;
  }
`

const BadgeWrapper = styled.div`
  position: absolute;
  top: 6px;
  right: 18px;
  width: auto;
  height: auto;

  .grade {
    transform: rotate(-20deg);
    position: absolute;
    top: 18px;
    left: 18px;
    font-family: ${monospaceFont};
    font-size: 10px;
    color: var(--color-text-muted);
    text-transform: lowercase;
  }
  .points {
    position: absolute;
    height: auto;
    top: 29px;
    line-height: 1.1;
    left: 50%;
    transform: translate(-50%, 0);
    font-family: ${headingFont};
    font-size: 22px;
    font-weight: 700;
    color: ${tones.toneNeutral46};
  }
`

const StyledFailedIcon = styled(FailedIcon)`
  margin-top: 3px;
  transform: rotate(10deg);
`

export interface ModuleCardProps {
  certificateConfigurationId: string | null | undefined
  module: UserModuleCompletionStatus
}

const ModuleCard: React.FC<React.PropsWithChildren<ModuleCardProps>> = ({
  certificateConfigurationId,
  module,
}) => {
  const { t } = useTranslation()
  const { grade, passed, prerequisite_modules_completed } = module
  const numericGrade = grade?.toString()
  const passOrFAilGrade = passed ? (
    // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- SVG icon with aria-label; not an <img>
    <PassedIcon role="img" aria-label={t("passed")} />
  ) : (
    // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- SVG icon with aria-label; not an <img>
    <StyledFailedIcon role="img" aria-label={t("failed")} />
  )

  return (
    <Wrapper>
      {prerequisite_modules_completed && (
        <BadgeWrapper
          aria-label={`${t("grade")}: ${numericGrade ?? t(passed ? "passed" : "failed")}`}
        >
          <Badge />
          <span className="grade">{t("grade")}</span>
          <div className="points">
            {numericGrade === undefined ? passOrFAilGrade : numericGrade}
          </div>
        </BadgeWrapper>
      )}
      <h3
        className={css`
          font-size: ${typography.h5};
          color: var(--tone-fg-accent-14);
          font-weight: 600;
        `}
      >
        {module.name}
      </h3>
      <CongratulationsLinks
        certificateConfigurationId={certificateConfigurationId}
        module={module}
      />
    </Wrapper>
  )
}

export default ModuleCard
