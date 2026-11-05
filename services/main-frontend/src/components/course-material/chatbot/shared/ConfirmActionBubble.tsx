"use client"

import { css, cx } from "@emotion/css"
import { CheckCircle, XmarkCircle } from "@vectopus/atlas-icons-react"
import React from "react"
import { useTranslation } from "react-i18next"

import type { ClientToolName } from "@/generated/course-material-api/types.generated"
import { Button } from "@/shared-module/components"
import { tones } from "@/shared-module/components/styles/themes"

import type { ClientToolBubbleProps } from "./clientToolRegistry"

export interface ConfirmActionBubbleProps<TCall> extends ClientToolBubbleProps<TCall> {
  /** The tool this call belongs to, named by the per-tool wrapper that renders this bubble. */
  toolName: ClientToolName
  title: string
  rows: React.ReactNode
  /** Whether this action is destructive or hard to reverse, which styles it red instead of green. */
  danger: boolean
  confirmLabel: string
  /** Extra content to show once the action has executed, built from `executionPayload`. */
  executedContent?: React.ReactNode
}

type BubbleVisualState =
  /** Still waiting for the admin to confirm or cancel. */
  | "open"
  /** Confirmed and executed. */
  | "executed"
  /** Confirmed no: cancelled by the admin. */
  | "declined"
  /** Closed with no answer: the admin sent a message instead. */
  | "aborted"

// Same rationale as `MultipleChoiceQuestionBubble`'s tints: the theme scale's own pale steps are
// too close to white to read as a tint, so a visible one comes from opacity instead.
const tint = (hex: string, alpha: string) => `${hex}${alpha}`

const bubbleBaseStyle = css`
  align-self: flex-start;
  width: min(40rem, 100%);
  margin: 0.5rem 2rem 0.5rem 0;
  padding: 1rem;
  border-radius: 10px;
  overflow-wrap: break-word;
`

const BUBBLE_CLASS_BY_STATE: Record<
  "safe-open" | "safe-closed" | "danger-open" | "danger-closed" | "neutral",
  string
> = {
  "safe-open": cx(
    bubbleBaseStyle,
    css`
      background-color: ${tint(tones.toneAccent16, "26")};
      border: 2px solid ${tones.toneAccent16};
    `,
  ),
  "safe-closed": cx(
    bubbleBaseStyle,
    css`
      background-color: ${tint(tones.toneAccent16, "14")};
      border: 2px solid ${tones.toneAccent12};
    `,
  ),
  "danger-open": cx(
    bubbleBaseStyle,
    css`
      background-color: ${tint(tones.toneDanger10, "26")};
      border: 2px solid ${tones.toneDanger10};
    `,
  ),
  "danger-closed": cx(
    bubbleBaseStyle,
    css`
      background-color: ${tint(tones.toneDanger10, "14")};
      border: 2px solid ${tones.toneDanger8};
    `,
  ),
  neutral: cx(
    bubbleBaseStyle,
    css`
      background-color: ${tones.toneNeutral29};
      border: 2px solid ${tones.toneNeutral35};
      color: ${tones.toneNeutral44};
    `,
  ),
}

const titleStyle = css`
  margin: 0;
  font-weight: 600;
`

const hintStyle = css`
  margin: 0.25rem 0 0.75rem;
  font-size: 0.8rem;
  color: ${tones.toneNeutral41};
`

const rowsStyle = css`
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
`

const buttonsStyle = css`
  display: flex;
  gap: 0.5rem;
`

const statusRowStyle = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
`

const successIconStyle = css`
  flex: none;
  width: 1.1rem;
  height: 1.1rem;
  color: ${tones.toneAccent21};
`

const declinedIconStyle = css`
  flex: none;
  width: 1.1rem;
  height: 1.1rem;
  color: ${tones.toneNeutral41};
`

/**
 * A privileged action a support chatbot suspended its turn on, asking the admin to confirm before
 * the server runs it. Shared by every confirmable action tool (T7-T10); each gets its own
 * `title`/`rows`/`executedContent` from a thin per-tool wrapper.
 */
const ConfirmActionBubble = <TCall,>({
  toolName,
  title,
  rows,
  danger,
  confirmLabel,
  executedContent,
  toolCallId,
  isOpen,
  isTurnInFlight,
  closedAnswer,
  onAnswer,
}: ConfirmActionBubbleProps<TCall>): React.ReactElement => {
  const { t } = useTranslation()

  const confirmed =
    closedAnswer !== undefined &&
    typeof closedAnswer.value === "object" &&
    closedAnswer.value !== null &&
    "confirmed" in closedAnswer.value
      ? Boolean((closedAnswer.value as { confirmed: unknown }).confirmed)
      : null

  const visualState: BubbleVisualState = (() => {
    if (confirmed === true) {
      // oxlint-disable-next-line i18next/no-literal-string -- an internal state tag, never rendered
      return "executed"
    }
    if (confirmed === false) {
      // oxlint-disable-next-line i18next/no-literal-string -- an internal state tag, never rendered
      return "declined"
    }
    if (isOpen) {
      // oxlint-disable-next-line i18next/no-literal-string -- an internal state tag, never rendered
      return "open"
    }
    // oxlint-disable-next-line i18next/no-literal-string -- an internal state tag, never rendered
    return "aborted"
  })()

  const buttonsDisabled = !isOpen || isTurnInFlight

  const bubbleClass = (() => {
    if (visualState === "aborted") {
      return BUBBLE_CLASS_BY_STATE.neutral
    }
    const isOpenState = visualState === "open"
    if (danger) {
      // oxlint-disable-next-line i18next/no-literal-string -- an internal state-class key, never rendered
      return BUBBLE_CLASS_BY_STATE[isOpenState ? "danger-open" : "danger-closed"]
    }
    // oxlint-disable-next-line i18next/no-literal-string -- an internal state-class key, never rendered
    return BUBBLE_CLASS_BY_STATE[isOpenState ? "safe-open" : "safe-closed"]
  })()

  const handleConfirm = () => {
    onAnswer(toolCallId, toolName, {
      type: "Data",
      data: { result: { confirmed: true } },
    })
  }
  const handleCancel = () => {
    onAnswer(toolCallId, toolName, {
      type: "Data",
      data: { result: { confirmed: false } },
    })
  }

  return (
    <div
      className={bubbleClass}
      role="group"
      aria-label={title}
      aria-busy={isOpen && isTurnInFlight}
    >
      <p className={titleStyle}>{title}</p>
      <div className={rowsStyle}>{rows}</div>

      {visualState === "open" && (
        <>
          <p className={hintStyle}>{t("chatbot-action-pending-confirmation")}</p>
          <div className={buttonsStyle}>
            <Button
              variant="primary"
              size="small"
              disabled={buttonsDisabled}
              onClick={handleConfirm}
            >
              {confirmLabel}
            </Button>
            <Button
              variant="secondary"
              size="small"
              disabled={buttonsDisabled}
              onClick={handleCancel}
            >
              {t("button-text-cancel")}
            </Button>
          </div>
        </>
      )}

      {visualState === "executed" && (
        <>
          <div className={statusRowStyle}>
            <CheckCircle aria-hidden="true" className={successIconStyle} />
            <span>{t("chatbot-action-executed")}</span>
          </div>
          {executedContent}
        </>
      )}

      {visualState === "declined" && (
        <div className={statusRowStyle}>
          <XmarkCircle aria-hidden="true" className={declinedIconStyle} />
          <span>{t("chatbot-action-declined")}</span>
        </div>
      )}

      {visualState === "aborted" && <p className={hintStyle}>{t("chatbot-action-aborted")}</p>}
    </div>
  )
}

export default ConfirmActionBubble
