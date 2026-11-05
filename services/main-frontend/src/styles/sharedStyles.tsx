"use client"

import { css } from "@emotion/css"

import { primaryFont } from "@/shared-module/common/styles"
import { respondToOrLarger } from "@/shared-module/common/styles/respond"

export const buttonBase = css`
  padding: 4px 8px;
  border-radius: 2px;
  border: none;
  font-family: ${primaryFont};

  ${respondToOrLarger.lg} {
    padding: 8px 16px;
  }
`

export const primaryButton = css`
  ${buttonBase};
  background: var(--tone-bg-accent-13);
  color: var(--color-text-on-accent);
  white-space: nowrap;
`

export const disabledButton = css`
  ${buttonBase};
  background: var(--tone-bg-neutral-81);
  color: var(--tone-fg-neutral-25);
  cursor: not-allowed;
`

export const containerBase = css`
  padding: 20px 0px;
  color: var(--color-text);
  max-width: 100%;

  ${respondToOrLarger.lg} {
    padding: 40px;
    max-width: 80rem;
    margin: 0 auto;
  }
`

export const actionButtonStyle = css`
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 4px;

  &:hover {
    background: var(--tone-bg-neutral-42);
  }
`

export const settingsCardCss = css`
  background: var(--color-surface);
  border: 1px solid var(--tone-border-neutral-27);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow:
    0 1px 3px var(--tone-shadow-neutral-5),
    0 1px 2px var(--tone-shadow-neutral-3);
  ${respondToOrLarger.md} {
    padding: 1.75rem;
  }
`
