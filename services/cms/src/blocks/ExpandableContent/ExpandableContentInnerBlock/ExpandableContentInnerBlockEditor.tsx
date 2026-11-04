"use client"

import { css } from "@emotion/css"
import { useBlockProps } from "@wordpress/block-editor"
import React from "react"

import { fontWeights, headingFont, primaryFont } from "@/shared-module/common/styles"
import { TextField } from "@/shared-module/components"
import RegisteredInnerBlocks from "@/utils/Gutenberg/RegisteredInnerBlocks"
import type { BlockEditProps } from "@/utils/Gutenberg/types"
import { useAttributeForm } from "@/utils/useAttributeForm"
import { useTranslation } from "@/utils/useCmsTranslation"

import type { ExpandableContentConfigurationProps } from "."
import { tones } from "@/shared-module/components/styles/themes"

const ExpandableContentInnerBlockEditor: React.FC<
  React.PropsWithChildren<BlockEditProps<ExpandableContentConfigurationProps>>
> = ({ attributes, setAttributes }) => {
  const { t } = useTranslation()
  const { control } = useAttributeForm({ name: attributes.name }, ({ name }) =>
    setAttributes({ name }),
  )
  // oxlint-disable-next-line i18next/no-literal-string
  const blockProps = useBlockProps({ className: "moocfi-expandable-content-inner-block" })

  return (
    <div {...blockProps}>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          box-sizing: border-box;
          padding: 1rem;
          border-radius: 4px;
          border: 1px solid ${tones.toneNeutral39};
          background: ${tones.toneNeutral12};
          margin: 0.5rem 0;
        `}
      >
        <p
          className={css`
            margin: 0 0 0.5rem 0;
            font-family: ${primaryFont};
            font-size: 0.8125rem;
            color: ${tones.toneNeutral46};
            font-weight: ${fontWeights.medium};
          `}
        >
          {t("expandable-content-section-title")}
        </p>
        <div
          className={css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding-bottom: 0.875rem;
            font-family: ${headingFont};
            color: ${tones.toneNeutral46};
          `}
        >
          <TextField
            name="name"
            control={control}
            label={t("label-title")}
            isLabelHidden
            placeholder={t("label-title")}
            className={css`
              margin: 0 !important;
              width: 100%;
              h4,
              label {
                margin: 0;
              }
              input {
                border: 1px solid ${tones.toneNeutral41} !important;
                border-radius: 4px !important;
                background: ${tones.toneNeutral12} !important;
                font-family: ${headingFont};
                font-weight: ${fontWeights.semibold};
                color: ${tones.toneNeutral46};
              }
            `}
          />
        </div>
        <p
          className={css`
            margin: 0 0 0.5rem 0;
            font-family: ${primaryFont};
            font-size: 0.8125rem;
            color: ${tones.toneNeutral46};
            font-weight: ${fontWeights.medium};
          `}
        >
          {t("expandable-content-section-content")}
        </p>
        <div
          className={css`
            background: ${tones.toneNeutral12};
            border: 1px dashed ${tones.toneNeutral44};
            border-radius: 4px;
            padding: 1rem;
            width: 100%;
            box-sizing: border-box;
            .block-editor-block-list__layout {
              width: 100%;
            }
          `}
        >
          <RegisteredInnerBlocks />
        </div>
      </div>
    </div>
  )
}

export default ExpandableContentInnerBlockEditor
