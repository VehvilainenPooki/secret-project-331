"use client"

import { css } from "@emotion/css"
import React, { useContext } from "react"
import { Button as AriaButton, OverlayTriggerStateContext } from "react-aria-components"

import { omitUndefined } from "@/shared-module/common/utils/nullability"

import ClarificationTooltip from "../ClarificationTooltip"

const Chevron: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 20 20"
    aria-hidden
    className={css`
      transition: transform 160ms ease;
      transform: rotate(${open ? 180 : 0}deg);
      opacity: 0.8;
    `}
  >
    <path
      d="M5 7l5 5 5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

interface TopBarMenuButtonProps {
  children: React.ReactNode
  ariaLabel: string
  tooltipText: string
  id?: string
  dataTestId?: string
  className?: string
  onClick?: () => void
  showChevron?: boolean
  lang?: string
  dir?: "ltr" | "rtl"
}

const TopBarMenuButton: React.FC<TopBarMenuButtonProps> = ({
  children,
  ariaLabel,
  tooltipText,
  id,
  dataTestId,
  className,
  onClick,
  showChevron = true,
  lang,
  dir,
}) => {
  const state = useContext(OverlayTriggerStateContext)
  const isOpen = state?.isOpen ?? false
  return (
    <ClarificationTooltip text={tooltipText}>
      <AriaButton
        {...omitUndefined({ id })}
        {...omitUndefined({ "data-testid": dataTestId })}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        {...omitUndefined({ lang })}
        {...omitUndefined({ dir })}
        className={css`
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 16px;
          height: 44px;
          min-width: fit-content;
          border-radius: 999px;
          background: var(--tone-bg-neutral-14);
          border: 1px solid var(--tone-border-neutral-9);
          cursor: pointer;
          transition: all 120ms ease;
          box-shadow: 0 1px 2px var(--tone-shadow-neutral-5);
          position: relative;

          &:hover,
          &[data-hovered] {
            background: var(--tone-bg-neutral-27);
            border-color: var(--tone-border-neutral-24);
            box-shadow: 0 2px 4px var(--tone-shadow-neutral-8);
          }
          &[data-pressed] {
            background: var(--tone-bg-neutral-54);
            border-color: var(--tone-border-neutral-34);
            box-shadow: 0 1px 2px var(--tone-shadow-neutral-13);
          }
          &[data-focus-visible] {
            box-shadow: 0 0 0 2px var(--tone-shadow-neutral-32);
          }

          ${className}
        `}
        {...omitUndefined({ onClick })}
      >
        {children}
        {showChevron && <Chevron open={isOpen} />}
      </AriaButton>
    </ClarificationTooltip>
  )
}

export default TopBarMenuButton
