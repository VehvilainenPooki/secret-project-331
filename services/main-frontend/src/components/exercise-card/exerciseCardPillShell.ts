import { css } from "@emotion/css"

import { secondaryFont } from "@/shared-module/common/styles"

export const exerciseCardPillShell = css`
  font-size: 9px;
  text-align: center;
  font-family: ${secondaryFont} !important;
  text-transform: uppercase;
  border-radius: 10px;
  background: var(--tone-bg-neutral-45);
  height: 60px;
  padding: 8px 16px 6px 16px;
  color: var(--tone-fg-info-9);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  box-shadow:
    var(--tone-shadow-info-1) 0 2px 4px,
    var(--tone-shadow-info-1) 0 7px 13px -3px,
    var(--tone-shadow-neutral-22) 0 -3px 0 inset;
`
