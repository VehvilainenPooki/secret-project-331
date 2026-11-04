"use client"

import { css } from "@emotion/css"
import { Padlock } from "@vectopus/atlas-icons-react"
import React from "react"
import { useTranslation } from "react-i18next"

import { primaryFont } from "@/shared-module/common/styles"

import type { BlockRendererProps } from "../.."
import InnerBlocks from "../../util/InnerBlocks"
import { tones } from "@/shared-module/components/styles/themes"

interface LockChapterLockedViewProps {
  blockProps: BlockRendererProps<unknown>
  showTeacherReviewPendingMessage: boolean
}

const LockChapterLockedView: React.FC<LockChapterLockedViewProps> = ({
  blockProps,
  showTeacherReviewPendingMessage,
}) => {
  const { t } = useTranslation()

  return (
    <div
      className={css`
        background: ${tones.toneAccent2};
        border: 2px solid ${tones.toneAccent16};
        border-radius: 8px;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      `}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
          gap: 1rem;
        `}
      >
        <div
          className={css`
            color: ${tones.toneAccent21};
            display: flex;
            align-items: center;
            flex-shrink: 0;
          `}
        >
          <Padlock size={32} />
        </div>
        <div
          className={css`
            flex: 1;
          `}
        >
          <h3
            className={css`
              margin: 0 0 0.25rem 0;
              font-family: ${primaryFont};
              font-size: 1.125rem;
              font-weight: 600;
              color: ${tones.toneNeutral46};
            `}
          >
            {t("chapter-locked-message")}
          </h3>
          <p
            className={css`
              margin: 0;
              font-family: ${primaryFont};
              font-size: 0.9375rem;
              color: ${tones.toneNeutral44};
            `}
          >
            {showTeacherReviewPendingMessage
              ? t("chapter-locked-waiting-teacher-review-description")
              : t("chapter-locked-description")}
          </p>
        </div>
      </div>
      {blockProps.data.innerBlocks && blockProps.data.innerBlocks.length > 0 && (
        <div
          className={css`
            padding-top: 1.5rem;
            border-top: 1px solid ${tones.toneAccent12};
          `}
        >
          <InnerBlocks
            parentBlockProps={blockProps}
            dontAllowInnerBlocksToBeWiderThanParentBlock={true}
          />
        </div>
      )}
    </div>
  )
}

export default LockChapterLockedView
