"use client"

import { css } from "@emotion/css"
import { InfoCircle } from "@vectopus/atlas-icons-react"

import { tones } from "@/shared-module/components/styles/themes"

const GenericInfobox: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={css`
        padding: 0.875rem 1rem;
        border-left: 3px solid ${tones.toneInfo20};
        border-radius: 0 6px 6px 0;
        background: ${tones.toneInfo1};
        display: flex;
        align-items: flex-start;

        overflow-x: auto;
      `}
    >
      <InfoCircle
        className={css`
          color: ${tones.toneInfo20};
          flex: none;
          margin-right: 0.5rem;
        `}
      />
      <div
        className={css`
          flex: 1;
        `}
      >
        {children}
      </div>
    </div>
  )
}

export default GenericInfobox
