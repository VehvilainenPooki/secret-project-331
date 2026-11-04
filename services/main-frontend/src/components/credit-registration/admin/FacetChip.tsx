"use client"

import { css, cx } from "@emotion/css"
import React from "react"

interface Props {
  label: string
  count?: number
  isSelected: boolean
  onToggle: () => void
}

const chipCss = css`
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3-5);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: var(--font-size-1);
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;

  &:hover {
    border-color: var(--tone-border-neutral-52);
  }

  &:focus-visible {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
  }
`

// Three cues at once, because a facet row is read by scanning: fill, border weight and type weight.
const selectedChipCss = css`
  border-color: var(--tone-border-info-9);
  box-shadow: inset 0 0 0 1px var(--tone-shadow-info-16);
  background: var(--tone-bg-info-2);
  color: var(--tone-fg-info-20);
  font-weight: 700;

  &:hover {
    border-color: var(--tone-border-info-12);
  }
`

const countCss = css`
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
`

const selectedCountCss = css`
  color: var(--color-link);
`

/**
 * One value of a multi-select facet, with how many rows carry it. `count` is over the whole
 * collection rather than the current page, so the chips keep saying what each would select.
 */
const FacetChip: React.FC<Props> = ({ label, count, isSelected, onToggle }) => (
  <button
    type="button"
    className={cx(chipCss, isSelected && selectedChipCss)}
    aria-pressed={isSelected}
    onClick={onToggle}
  >
    <span>{label}</span>
    {count !== undefined && (
      <span className={cx(countCss, isSelected && selectedCountCss)}>{count}</span>
    )}
  </button>
)

export default FacetChip
