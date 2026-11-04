"use client"

import { css } from "@emotion/css"
import React from "react"

import { useTranslation } from "@/utils/useCmsTranslation"

import type { PlaceholderValidationResult } from "../../utils/emailPlaceholders"
import {
  getPlaceholderConfig,
  PLACEHOLDER_CODE,
  PLACEHOLDER_COURSE_NAME,
  PLACEHOLDER_CREDITS,
  PLACEHOLDER_ENROLMENT_LINK,
  PLACEHOLDER_LINK,
  PLACEHOLDER_MODULE_NAME,
  PLACEHOLDER_NAME,
  PLACEHOLDER_RESET_LINK,
  PLACEHOLDER_STATUS_LINK,
  PLACEHOLDER_STUDENT_NUMBER,
} from "../../utils/emailPlaceholders"

interface PlaceholderInfoProps {
  templateType: unknown
  validation: PlaceholderValidationResult
}

const PlaceholderInfo: React.FC<React.PropsWithChildren<PlaceholderInfoProps>> = ({
  templateType,
  validation,
}) => {
  const { t } = useTranslation()
  const templateTypeString =
    typeof templateType === "string" ? templateType : (templateType as unknown as string)

  if (templateTypeString === "generic") {
    return null
  }

  const config = getPlaceholderConfig(templateTypeString)

  const getPlaceholderDescription = (placeholder: string): string => {
    switch (placeholder) {
      case PLACEHOLDER_RESET_LINK:
        return t("placeholder-reset-link-description")
      case PLACEHOLDER_CODE:
        return t("placeholder-code-description")
      case PLACEHOLDER_LINK:
        return t("placeholder-link-description")
      case PLACEHOLDER_NAME:
        return t("placeholder-name-description")
      case PLACEHOLDER_STUDENT_NUMBER:
        return t("placeholder-student-number-description")
      case PLACEHOLDER_COURSE_NAME:
        return t("placeholder-course-name-description")
      case PLACEHOLDER_MODULE_NAME:
        return t("placeholder-module-name-description")
      case PLACEHOLDER_CREDITS:
        return t("placeholder-credits-description")
      case PLACEHOLDER_ENROLMENT_LINK:
        return t("placeholder-enrolment-link-description")
      case PLACEHOLDER_STATUS_LINK:
        return t("placeholder-status-link-description")
      default:
        return ""
    }
  }

  if (!config) {
    return null
  }

  return (
    <div
      className={css`
        padding: 1rem;
        border: 1px solid var(--tone-border-neutral-29);
        border-radius: 4px;
        background-color: var(--tone-bg-neutral-17);
        margin-bottom: 1rem;
      `}
    >
      <h3
        className={css`
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
        `}
      >
        {t("email-placeholders")}
      </h3>

      {validation.errors.length > 0 && (
        <div
          className={css`
            margin-bottom: 1rem;
          `}
        >
          {validation.errors.map((error, index) => (
            <div
              key={index}
              className={css`
                padding: 0.5rem;
                background-color: var(--tone-bg-danger-6);
                border: 1px solid var(--tone-border-danger-7);
                border-radius: 4px;
                color: var(--tone-fg-danger-13);
                margin-bottom: 0.5rem;
                font-size: 0.875rem;
              `}
            >
              {error}
            </div>
          ))}
        </div>
      )}

      {validation.warnings.length > 0 && (
        <div
          className={css`
            margin-bottom: 1rem;
          `}
        >
          {validation.warnings.map((warning, index) => (
            <div
              key={index}
              className={css`
                padding: 0.5rem;
                background-color: var(--tone-bg-warning-4);
                border: 1px solid var(--tone-border-warning-2);
                border-radius: 4px;
                color: var(--tone-fg-warning-3);
                margin-bottom: 0.5rem;
                font-size: 0.875rem;
              `}
            >
              {warning}
            </div>
          ))}
        </div>
      )}

      <div
        className={css`
          margin-bottom: 1rem;
        `}
      >
        <div
          className={css`
            font-weight: 600;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
          `}
        >
          {t("available-placeholders")}:
        </div>
        {config.available.map((placeholder) => {
          const isDetected = validation.detectedPlaceholders.includes(placeholder)
          const isRequired = config.required.includes(placeholder)
          return (
            <div
              key={placeholder}
              className={css`
                padding: 0.5rem;
                margin-bottom: 0.5rem;
                border-radius: 4px;
                background-color: ${isDetected ? "var(--tone-tone-accent-6)" : "var(--tone-tone-neutral-6)"};
                border: 1px solid ${isDetected ? "var(--tone-tone-accent-8)" : "var(--tone-tone-neutral-27)"};
                font-size: 0.875rem;
              `}
            >
              <code
                className={css`
                  font-weight: 600;
                  color: ${isDetected ? "var(--tone-tone-accent-24)" : "var(--tone-tone-neutral-42)"};
                `}
              >
                {`{{${placeholder}}}`}
              </code>
              {isRequired && (
                <span
                  className={css`
                    margin-left: 0.5rem;
                    color: var(--tone-fg-danger-3);
                    font-size: 0.75rem;
                  `}
                >
                  ({t("required")})
                </span>
              )}
              {isDetected && (
                <span
                  className={css`
                    margin-left: 0.5rem;
                    color: var(--tone-fg-accent-9);
                    font-size: 0.75rem;
                  `}
                >
                  {/* oxlint-disable-next-line i18next/no-literal-string */}
                  {"✓ "}
                  {t("detected")}
                </span>
              )}
              {getPlaceholderDescription(placeholder) && (
                <div
                  className={css`
                    margin-top: 0.25rem;
                    color: var(--tone-fg-neutral-19);
                    font-size: 0.75rem;
                  `}
                >
                  {getPlaceholderDescription(placeholder)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {validation.detectedPlaceholders.length === 0 && config.required.length > 0 && (
        <div
          className={css`
            padding: 0.5rem;
            background-color: var(--tone-bg-warning-4);
            border: 1px solid var(--tone-border-warning-2);
            border-radius: 4px;
            color: var(--tone-fg-warning-3);
            font-size: 0.875rem;
          `}
        >
          {t("no-placeholders-detected")}
        </div>
      )}
    </div>
  )
}

export default PlaceholderInfo
