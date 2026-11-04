"use client"

import { css } from "@emotion/css"
import React from "react"
import { Tooltip, TooltipTrigger } from "react-aria-components"

interface ClarificationTooltipProps {
  children: React.ReactNode
  text: string
  offset?: number
}

const ClarificationTooltip: React.FC<ClarificationTooltipProps> = ({
  children,
  text,
  offset = 8,
}) => {
  return (
    <TooltipTrigger>
      {children}
      <Tooltip
        offset={offset}
        className={css`
          background: var(--tone-bg-neutral-92);
          color: var(--color-text-on-accent);
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          box-shadow: 0 4px 12px var(--tone-shadow-neutral-16);
          z-index: 1000;
          max-width: 200px;
        `}
      >
        {text}
      </Tooltip>
    </TooltipTrigger>
  )
}

export default ClarificationTooltip
