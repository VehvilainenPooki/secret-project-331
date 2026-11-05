"use client"

import { css } from "@emotion/css"
import React from "react"

import { headingFont } from "@/shared-module/common/styles"
import { tones } from "@/shared-module/components/styles/themes"
import RegisteredInnerBlocks from "@/utils/Gutenberg/RegisteredInnerBlocks"
import type { BlockEditProps } from "@/utils/Gutenberg/types"
import { useTranslation } from "@/utils/useCmsTranslation"

import BlockWrapper from "../BlockWrapper"

const AuthorEditor: React.FC<
  React.PropsWithChildren<BlockEditProps<Record<string, never>>>
> = () => {
  const { t } = useTranslation()
  return (
    <BlockWrapper>
      <div>
        <div
          className={css`
            padding: 1rem;
            background: ${tones.toneNeutral12};
            text-align: center;
            font-family: ${headingFont};
          `}
        >
          <h4>{t("authors-block")}</h4>
          <span
            className={css`
              color: ${tones.toneNeutral44};
              text-align: center;
              font-weight: 500;
              display: inline-block;
              margin-bottom: 1.4rem;
              font-family: ${headingFont};
            `}
          >
            {t("authors-block-description")}
          </span>

          <div>
            <RegisteredInnerBlocks />
          </div>
        </div>
      </div>
    </BlockWrapper>
  )
}

export default AuthorEditor
