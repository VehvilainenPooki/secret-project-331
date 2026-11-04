/* oxlint-disable i18next/no-literal-string */
"use client"

import { css, cx } from "@emotion/css"
import React from "react"
import { Link as AriaLink, Tooltip, TooltipTrigger } from "react-aria-components"

import MOOCfi from "@/shared-module/common/img/moocfiLogo.svg"

const StyledIcon = css`
  font-size: 1.8rem;

  path {
    color: var(--tone-fg-info-12) !important;
  }
`

const Brand: React.FC = () => {
  return (
    <TooltipTrigger>
      <AriaLink
        href="/"
        aria-label="Go to home"
        className={css`
          display: inline-flex;
          align-items: center;
          border-radius: 12px;
          padding: 8px 10px; /* slightly larger target */
          outline: none;
          transition: background 120ms ease;
          text-decoration: none;

          &:hover,
          &[data-hovered] {
            background: var(--tone-bg-neutral-35);
          }
          &[data-focus-visible] {
            box-shadow: 0 0 0 2px var(--tone-shadow-neutral-32);
          }
        `}
      >
        <MOOCfi className={cx(StyledIcon)} />
      </AriaLink>
      <Tooltip
        className={css`
          background: var(--tone-bg-neutral-92);
          color: var(--color-text-on-accent);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
        `}
      >
        Home
      </Tooltip>
    </TooltipTrigger>
  )
}

export default Brand
