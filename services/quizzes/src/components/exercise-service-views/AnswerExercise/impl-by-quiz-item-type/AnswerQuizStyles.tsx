import { primaryFont } from "@/shared-module/exercise-react/styles"

export const TWO_DIMENSIONAL_BUTTON_STYLES = `
  position: relative;
  align-items: center;
  flex-grow: 1;
  appearance: none;
  background-color: var(--tone-bg-neutral-10);
  border-radius: 0.625rem;
  border: 0.188rem solid var(--tone-border-neutral-50);
  box-shadow:
    var(--tone-shadow-info-1) 0 2px 4px,
    var(--tone-shadow-info-1) 0 7px 13px -3px,
    var(--tone-shadow-neutral-26) 0 -2px 0 inset;
  color: var(--tone-fg-info-17);
  cursor: pointer;
  display: flex;
  min-height: 3rem;
  justify-content: center;
  line-height: 120%;
  list-style: none;
  padding: 0.875rem;
  text-align: left;
  text-decoration: none;
  transition:
    box-shadow 0.15s,
    transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: box-shadow;
  font-size: 1.125rem;
  margin-bottom: 0.625rem;
  margin-right: 0.625rem;

  &:focus-visible {
    outline: 3px solid var(--tone-border-info-10);
    outline-offset: 2px;
  }

  &[aria-pressed="true"],
  &[aria-current="true"] {
    font-weight: 600;
  }

  &:hover {
    background: var(--tone-bg-neutral-37);
    border-color: var(--tone-border-info-6);
    box-shadow:
      var(--tone-shadow-info-1) 0 4px 8px,
      var(--tone-shadow-info-1) 0 7px 13px -3px,
      var(--tone-shadow-info-13) 0 -2px 0 inset;
  }
`

export const QUIZ_TITLE_STYLE = `
  font-weight: 500;
  color: var(--tone-fg-info-10);
  font-family: ${primaryFont};
  font-size: 1.25rem;
  margin-bottom: 1rem;
`

export const TWO_DIMENSIONAL_BUTTON_SELECTED = `
  background: var(--tone-bg-neutral-37);
  border-color: var(--tone-border-info-10);
  box-shadow:
    var(--tone-shadow-info-1) 0 4px 8px,
    var(--tone-shadow-info-1) 0 7px 13px -3px,
    var(--tone-shadow-info-17) 0 -2px 0 inset;
  color: var(--tone-fg-info-19);
`
