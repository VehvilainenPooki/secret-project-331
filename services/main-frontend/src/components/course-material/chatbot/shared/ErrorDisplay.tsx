"use client"

import { css } from "@emotion/css"
import type { TFunction } from "i18next"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { zStreamEventError } from "@/generated/course-material-api/zod.generated"
import { normalizeErrorForDisplay } from "@/shared-module/common/errors/normalizeErrorForDisplay"
import { monospaceFont } from "@/shared-module/common/styles"
import { Disclosure } from "@/shared-module/components"
import { tones, withAlpha } from "@/shared-module/components/styles/themes"

interface ErrorDisplayProps {
  /// An unknown error type, can also be StreamEventError
  error: unknown
}

/** Formats chatbot errors using normalized display metadata. */
const formatErrorMessage = (
  error: unknown,
  t: TFunction<"errors">,
): { boldPart: string; normalPart: string; details: string[]; originalMessage: string } => {
  const normalized = normalizeErrorForDisplay(error, t)
  const details: string[] = []
  if (normalized.status !== null) {
    details.push(t("error-status", { status: normalized.status }))
  }
  if (normalized.code) {
    details.push(t("error-type", { type: normalized.code }))
  }
  if (normalized.requestId) {
    details.push(t("error-request-id", { requestId: normalized.requestId }))
  }
  if (normalized.retryAfterSeconds !== null) {
    details.push(t("error-retry-after", { seconds: normalized.retryAfterSeconds }))
  }
  for (const issue of normalized.issues) {
    details.push(`${issue.path ? `${issue.path}: ` : ""}${issue.message}`)
  }

  return {
    boldPart: t("failed-to-send-message"),
    normalPart: normalized.messageKey ? `: ${normalized.messageKey}` : `: ${normalized.title}`,
    details,
    originalMessage: typeof normalized.raw === "string" ? normalized.raw : normalized.title,
  }
}

// Helper function to format the original error message for display
const formatOriginalErrorMessage = (originalMessage: string): string => {
  // Try to extract and format JSON from the error message
  const jsonMatch = originalMessage.match(/\{.*\}/)
  if (!jsonMatch) {
    return originalMessage
  }

  try {
    const jsonStr = jsonMatch[0]
    const parsed = JSON.parse(jsonStr)
    const formatted = JSON.stringify(parsed, null, 2)

    // Replace the JSON part in the original message with the formatted version
    // oxlint-disable-next-line i18next/no-literal-string
    return originalMessage.replace(jsonMatch[0], `\n${formatted}`)
  } catch {
    return originalMessage
  }
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  const { t } = useTranslation("errors")
  const [showDetails, setShowDetails] = useState(false)

  const parsed = zStreamEventError.safeParse(error)

  const formattedError = parsed.success
    ? {
        boldPart: t("failed-to-send-message"),
        normalPart: parsed.data.message,
        details: parsed.data.details ? [parsed.data.message] : [],
        originalMessage: parsed.data.details ?? "",
      }
    : formatErrorMessage(error, t)
  const hasDetails = formattedError.details.length > 0

  return (
    <div>
      <div
        className={css`
          margin: 16px 12px;
          border: 1px solid ${tones.toneDanger8};
          border-left: 4px solid ${tones.toneDanger10};
          background: ${withAlpha(tones.toneDanger2, 25.1)};
          border-radius: 8px;
          box-shadow:
            0 2px 8px ${withAlpha(tones.toneDanger7, 37.65)},
            0 1px 3px ${withAlpha(tones.toneDanger8, 25.1)};
          overflow: auto;
          backdrop-filter: blur(4px);
        `}
      >
        {/* role=alert is atomic, so it must not reach the details: expanding them would otherwise
            re-speak the whole block, raw JSON included. */}
        <div
          role="alert"
          className={css`
            padding: 16px 20px;
            background: ${withAlpha(tones.toneDanger2, 12.55)};
            color: ${tones.toneDanger19};
            font-weight: 500;
            font-size: 0.9rem;
            line-height: 1.4;
          `}
        >
          <span
            className={css`
              font-weight: bold;
              margin-right: 0.5rem;
            `}
          >
            {formattedError.boldPart}
          </span>
          <span
            className={css`
              font-weight: normal;
            `}
          >
            {formattedError.normalPart}
          </span>
        </div>

        {hasDetails && (
          <div
            className={css`
              padding: 12px 20px;
              background-color: ${withAlpha(tones.toneDanger2, 14.51)};
              border-top: 1px solid ${withAlpha(tones.toneDanger7, 31.37)};
            `}
          >
            <Disclosure
              variant="plain"
              title={showDetails ? t("error-hide-details") : t("error-show-details")}
              expanded={showDetails}
              onExpandedChange={setShowDetails}
            >
              {formattedError.details.map((detail, index) => (
                <div
                  key={index}
                  className={css`
                    margin-bottom: 8px;
                    padding: 8px 12px;
                    background-color: ${withAlpha(tones.toneDanger2, 12.55)};
                    border-radius: 4px;
                    font-size: 0.85rem;
                    color: ${tones.toneDanger17};
                    font-family: ${monospaceFont};
                  `}
                >
                  {detail}
                </div>
              ))}

              <Disclosure
                title={t("error-original-message")}
                className={css`
                  margin-top: 12px;
                  font-size: 0.8rem;
                `}
              >
                <pre
                  className={css`
                    margin: 0;
                    font-size: 0.75rem;
                    background-color: ${withAlpha(tones.toneDanger2, 8.24)};
                    padding: 16px;
                    border: none;
                    overflow-x: auto;
                    white-space: pre-wrap;
                    overflow-wrap: break-word;
                    font-family: ${monospaceFont};
                    color: ${tones.toneDanger17};
                    line-height: 1.5;
                    max-height: 400px;
                    overflow-y: auto;
                  `}
                >
                  {formatOriginalErrorMessage(formattedError.originalMessage)}
                </pre>
              </Disclosure>
            </Disclosure>
          </div>
        )}
      </div>
    </div>
  )
}

export default ErrorDisplay
