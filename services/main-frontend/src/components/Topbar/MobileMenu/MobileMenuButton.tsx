"use client"

import { css } from "@emotion/css"
import React, { useRef } from "react"
import { useButton } from "react-aria"
import { useTranslation } from "react-i18next"

import Hamburger from "@/shared-module/common/components/Navigation/NavBar/Menu/Hamburger/Hamburger"
import { respondToOrLarger } from "@/shared-module/common/styles/respond"

import type { MobileMenuButtonProps } from "./types"

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ state }) => {
  const { t } = useTranslation()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(
    {
      onPress: state.open,
      "aria-label": t("open-menu"),
      "aria-expanded": state.isOpen,
    },
    buttonRef,
  )

  return (
    <button
      {...buttonProps}
      ref={buttonRef}
      className={css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 999px;
        background: var(--tone-bg-neutral-14);
        border: 1px solid var(--tone-border-neutral-9);
        cursor: pointer;
        transition: all 120ms ease;
        box-shadow: 0 1px 2px var(--tone-shadow-neutral-5);
        margin-inline-start: auto;

        &:hover {
          background: var(--tone-bg-neutral-27);
          border-color: var(--tone-border-neutral-24);
          box-shadow: 0 2px 4px var(--tone-shadow-neutral-8);
        }

        &:active {
          background: var(--tone-bg-neutral-54);
          border-color: var(--tone-border-neutral-34);
          box-shadow: 0 1px 2px var(--tone-shadow-neutral-13);
        }

        &:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--tone-shadow-neutral-32);
        }

        ${respondToOrLarger.md} {
          display: none;
        }
      `}
    >
      <Hamburger isActive={state.isOpen} buttonWidth={20} />
    </button>
  )
}
