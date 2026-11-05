"use client"

import { css } from "@emotion/css"
import { InspectorControls } from "@wordpress/block-editor"
import React from "react"

import { headingFont } from "@/shared-module/common/styles"
import { tones } from "@/shared-module/components/styles/themes"
import RegisteredInnerBlocks from "@/utils/Gutenberg/RegisteredInnerBlocks"
import type { BlockEditProps } from "@/utils/Gutenberg/types"
import { useTranslation } from "@/utils/useCmsTranslation"

import type { TableBoxAttributes } from "."
import TableBoxWidthCustomizer from "../../components/blocks/TableBoxWidthCustomizer"
import BlockWrapper from "../BlockWrapper"

const TableEditor: React.FC<React.PropsWithChildren<BlockEditProps<TableBoxAttributes>>> = ({
  attributes,
  setAttributes,
}) => {
  const { t } = useTranslation()
  return (
    <BlockWrapper>
      <InspectorControls key="tablebox-settings">
        <TableBoxWidthCustomizer attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>
      <div>
        <div
          className={css`
            padding: 1rem;
            background: var(--tone-bg-neutral-41);
            text-align: center;
            font-family: ${headingFont};
          `}
        >
          <h4>{t("table-box")}</h4>
          <span
            className={css`
              color: ${tones.toneAccent21};
              text-align: center;
              font-weight: 600;
              font-family: ${headingFont};
            `}
          >
            {t("table-box-description")}
          </span>
        </div>
        <RegisteredInnerBlocks />
      </div>
    </BlockWrapper>
  )
}

export default TableEditor
