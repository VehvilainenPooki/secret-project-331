"use client"

import { css } from "@emotion/css"
import { ExclamationTriangle } from "@vectopus/atlas-icons-react"

import { tones } from "@/shared-module/components/styles/themes"

const WarningInfobox: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={css`
        padding: 0.7rem 1rem;
        border: 2px solid ${tones.toneWarning11};
        background-color: ${tones.toneWarning3};
        border-radius: 8px;
        display: flex;
        align-items: center;

        overflow-x: auto;
      `}
    >
      <ExclamationTriangle
        className={css`
          color: ${tones.toneWarning12};
          margin-right: 0.5rem;
          flex-shrink: 0;
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

export default WarningInfobox
