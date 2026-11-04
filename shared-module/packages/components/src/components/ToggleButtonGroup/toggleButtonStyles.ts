import { css } from "@emotion/css"

export const toggleButtonBaseCss = css`
  border-color: var(--tone-border-neutral-20) transparent var(--tone-border-neutral-20) transparent;
  &:first-child {
    border-radius: var(--control-radius) 0 0 var(--control-radius);
    margin-inline-start: 0;

    border-color: var(--tone-border-neutral-20) transparent var(--tone-border-neutral-20) var(--tone-border-neutral-20);
  }

  &:last-child {
    border-radius: 0 var(--control-radius) var(--control-radius) 0;
    border-color: var(--tone-border-neutral-20) var(--tone-border-neutral-20) var(--tone-border-neutral-20) transparent;
  }
`
