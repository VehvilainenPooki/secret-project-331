"use client"

import { css } from "@emotion/css"
import { Padlock } from "@vectopus/atlas-icons-react"
import React from "react"
import { useTranslation } from "react-i18next"

import { primaryFont } from "@/shared-module/common/styles"
import { Button, ErrorNotice } from "@/shared-module/components"
import { tones } from "@/shared-module/components/styles/themes"

interface LockChapterUnlockedViewProps {
  onLock: () => void
  isLocking: boolean
  isLoadingPreview: boolean
  error: Error | null
  previewError: Error | null
}

const LockChapterUnlockedView: React.FC<LockChapterUnlockedViewProps> = ({
  onLock,
  isLocking,
  isLoadingPreview,
  error,
  previewError,
}) => {
  const { t } = useTranslation()

  return (
    <div
      className={css`
        background: ${tones.toneNeutral12};
        border: 1px solid ${tones.toneNeutral37};
        border-radius: 8px;
        padding: 2.5rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        text-align: center;
      `}
    >
      <div
        className={css`
          color: ${tones.toneInfo23};
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Padlock size={48} />
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 500px;
        `}
      >
        <h3
          className={css`
            margin: 0;
            font-family: ${primaryFont};
            font-size: 1.25rem;
            font-weight: 600;
            color: ${tones.toneNeutral46};
          `}
        >
          {t("lock-chapter-title")}
        </h3>
        <p
          className={css`
            margin: 0;
            font-family: ${primaryFont};
            font-size: 0.9375rem;
            line-height: 1.6;
            color: ${tones.toneNeutral44};
          `}
        >
          {t("lock-chapter-description")}
        </p>
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 300px;
        `}
      >
        <Button
          variant="primary"
          size="large"
          onClick={onLock}
          disabled={isLocking || isLoadingPreview}
          className={css`
            width: 100%;
          `}
        >
          {isLoadingPreview
            ? t("lock-chapter-checking")
            : isLocking
              ? t("locking-chapter")
              : t("lock-chapter")}
        </Button>
        {(error || previewError) && <ErrorNotice error={(error ?? previewError) as Error} />}
      </div>
    </div>
  )
}

export default LockChapterUnlockedView
