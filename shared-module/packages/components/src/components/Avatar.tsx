"use client"

import { css, cx } from "@emotion/css"
import React from "react"

export interface AvatarProps {
  /** Full name; initials are derived from it and it seeds the background colour. */
  name: string
  /** Diameter in pixels. */
  size?: number
  className?: string
  /** The monogram is `aria-hidden`, so a test has no role to query it by. */
  "data-testid"?: string | undefined
}

// Decorative monogram; the name is shown as text alongside, so this is aria-hidden.
const AVATAR_COLORS = [
  "var(--tone-tone-info-23)",
  "var(--tone-tone-accent-21)",
  "var(--tone-tone-special-2)",
  "var(--tone-tone-danger-21)",
  "var(--tone-tone-neutral-44)",
]

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const first = parts[0]
  if (!first) {
    return "?"
  }
  if (parts.length === 1) {
    return first.slice(0, 2).toUpperCase()
  }
  const last = parts[parts.length - 1] ?? first
  return (first.charAt(0) + last.charAt(0)).toUpperCase()
}

function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + (str.codePointAt(i) ?? 0)) % 2147483647
  }
  return h
}

const rootCss = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  border-radius: 50%;
  color: var(--color-text-on-accent);
  font-weight: 700;
  text-transform: uppercase;
  user-select: none;
`

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 48,
  className,
  "data-testid": dataTestId,
}) => {
  const sizeCss = css`
    width: ${size}px;
    height: ${size}px;
    background: ${AVATAR_COLORS[hash(name) % AVATAR_COLORS.length]};
    font-size: ${Math.round(size * 0.38)}px;
  `
  return (
    <span className={cx(rootCss, sizeCss, className)} aria-hidden="true" data-testid={dataTestId}>
      {initials(name)}
    </span>
  )
}
