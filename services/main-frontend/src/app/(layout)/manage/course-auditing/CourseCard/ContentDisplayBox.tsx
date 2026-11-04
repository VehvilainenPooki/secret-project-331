"use client"

import { css } from "@emotion/css"
import type { ReactNode } from "react"
import React from "react"
import { useTranslation } from "react-i18next"

import { tones } from "@/shared-module/components/styles/themes"

interface ContentDisplayBoxProps {
  label: string
  content?: ReactNode
  isVisible?: boolean
}

const ContentDisplayBox: React.FC<ContentDisplayBoxProps> = ({
  label,
  content,
  isVisible = true,
}) => {
  const { t } = useTranslation()

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={css`
        border-radius: 0.5rem;
        border: 1px solid ${tones.toneInfo7};
        background: ${tones.toneInfo1};
        padding: 0.75rem 1rem;
        flex-grow: 1;
      `}
      data-testid="content-display-box"
    >
      <div
        className={css`
          font-size: 1rem;
          font-weight: 600;
          color: ${tones.toneNeutral47};
          margin: 0 0 0.5rem 0;
        `}
      >
        {label}
      </div>
      <div
        className={css`
          font-size: 0.85rem;
          color: ${tones.toneNeutral46};
          margin: 0.35rem 0;
        `}
      >
        {content ?? t("label-null")}
      </div>
    </div>
  )
}

export default ContentDisplayBox
