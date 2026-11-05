"use client"

import { css } from "@emotion/css"
import React from "react"

import { headingFont } from "@/shared-module/common/styles"
import { tones } from "@/shared-module/components/styles/themes"
import RegisteredInnerBlocks from "@/utils/Gutenberg/RegisteredInnerBlocks"
import type { BlockEditProps } from "@/utils/Gutenberg/types"
import { useTranslation } from "@/utils/useCmsTranslation"

import BlockWrapper from "../BlockWrapper"

const PartnerEditor: React.FC<
  React.PropsWithChildren<BlockEditProps<Record<string, never>>>
> = () => {
  const { t } = useTranslation()
  return (
    <BlockWrapper>
      <div>
        <div
          className={css`
            padding: 1rem;
            background: var(--tone-bg-neutral-41);
            text-align: center;
            font-family: ${headingFont};
          `}
        >
          <h4>{t("partners-block")}</h4>
          <span
            className={css`
              color: ${tones.toneAccent21};
              text-align: center;
              font-weight: 600;
              font-family: ${headingFont};
            `}
          >
            {t("partners-block-description")}
          </span>
        </div>
        <div>
          <RegisteredInnerBlocks />
        </div>
      </div>
    </BlockWrapper>
  )
}

export default PartnerEditor
