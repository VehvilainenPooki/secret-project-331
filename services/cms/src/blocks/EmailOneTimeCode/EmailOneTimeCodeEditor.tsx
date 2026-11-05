"use client"

import { css } from "@emotion/css"
import { PlainText } from "@wordpress/block-editor"
import React from "react"

import type { BlockEditProps } from "@/utils/Gutenberg/types"
import { useTranslation } from "@/utils/useCmsTranslation"

import type { EmailOneTimeCodeAttributes } from "."
import BlockWrapper from "../BlockWrapper"

const EmailOneTimeCodeEditor: React.FC<
  React.PropsWithChildren<BlockEditProps<EmailOneTimeCodeAttributes>>
> = ({ attributes, setAttributes }) => {
  const { t } = useTranslation()

  return (
    <BlockWrapper>
      <PlainText
        className={css`
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 16px;
          background-color: var(--tone-bg-neutral-20);
          border: 1px solid var(--tone-border-neutral-27);
          border-radius: 6px;
          text-align: center;
          font-family: SFMono-Regular, Menlo, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 22px;
          line-height: 30px;
          font-weight: 600;
          letter-spacing: 4px;
          color: var(--color-text);
          overflow-wrap: anywhere;
          margin: 0 0 18px;
        `}
        value={attributes.code}
        onChange={(code: string) => setAttributes({ code })}
        aria-label={t("email-one-time-code")}
      />
    </BlockWrapper>
  )
}

export default EmailOneTimeCodeEditor
