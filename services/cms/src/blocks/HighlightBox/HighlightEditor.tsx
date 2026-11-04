"use client"

import { css } from "@emotion/css"
import { RichText } from "@wordpress/block-editor"
import React, { useId } from "react"

import { fontWeights, monospaceFont, primaryFont } from "@/shared-module/common/styles"
import type { BlockEditProps } from "@/utils/Gutenberg/types"
import { useTranslation } from "@/utils/useCmsTranslation"

import type { HighlightAttributes } from "."
import BlockWrapper from "../BlockWrapper"
import { tones } from "@/shared-module/components/styles/themes"

const HighlightEditor: React.FC<React.PropsWithChildren<BlockEditProps<HighlightAttributes>>> = ({
  attributes,
  setAttributes,
}) => {
  const { t } = useTranslation()
  const { title, content } = attributes
  const highlightTitleLabelId = useId()
  const highlightContentLabelId = useId()

  return (
    <BlockWrapper>
      <div
        className={css`
          background: var(--tone-bg-neutral-13);
          border: 1px solid var(--color-border);
          padding: 1rem 0;
        `}
      >
        <div
          className={css`
            max-width: 48rem;
            margin-left: auto;
            margin-right: auto;
            padding: 0 1.375rem;
          `}
        >
          <p
            id={highlightTitleLabelId}
            className={css`
              margin: 0 0 0.5rem 0;
              font-family: ${primaryFont};
              font-size: 0.8125rem;
              color: ${tones.toneNeutral46};
              font-weight: ${fontWeights.medium};
            `}
          >
            {t("highlight-box-title-label")}
          </p>
          <RichText
            className={css`
              display: block;
              width: 100%;
              border: 1px solid ${tones.toneNeutral41};
              border-radius: 4px;
              padding: 0.5rem 0.75rem;
              background: ${tones.toneNeutral12};
              color: ${tones.toneAccent23};
              font-weight: ${fontWeights.bold};
              font-family: ${monospaceFont};
              margin-bottom: 0.875rem;
            `}
            tagName="div"
            aria-labelledby={highlightTitleLabelId}
            value={title}
            onChange={(value: string) => setAttributes({ title: value })}
            placeholder={t("highlight-box-title-placeholder")}
          />
          <p
            id={highlightContentLabelId}
            className={css`
              margin: 0 0 0.5rem 0;
              font-family: ${primaryFont};
              font-size: 0.8125rem;
              color: ${tones.toneNeutral46};
              font-weight: ${fontWeights.medium};
            `}
          >
            {t("highlight-box-content-label")}
          </p>
          <RichText
            className={css`
              display: block;
              width: 100%;
              min-height: 2rem;
              border: 1px solid ${tones.toneNeutral41};
              border-radius: 4px;
              padding: 0.5rem 0.75rem;
              background: ${tones.toneNeutral12};
            `}
            tagName="div"
            aria-labelledby={highlightContentLabelId}
            value={content}
            onChange={(value: string) => setAttributes({ content: value })}
            placeholder={t("highlight-box-content-placeholder")}
          />
        </div>
      </div>
    </BlockWrapper>
  )
}

export default HighlightEditor
