"use client"

import styled from "@emotion/styled"

import { primaryFont } from "@/shared-module/common/styles"
import { tones } from "@/shared-module/components/styles/themes"

export const TooltipBox = styled.div`
  border-radius: 8px;
  min-width: 200px;
  max-width: 400px;
  box-shadow:
    0 4px 6px -1px var(--tone-shadow-neutral-10),
    0 2px 4px -1px var(--tone-shadow-neutral-7);
  background: ${tones.toneNeutral1};
  border: 1px solid ${tones.toneNeutral26};
  padding: 10px 14px;
  color: ${tones.toneNeutral46};
  font-family: ${primaryFont};
  font-size: 14px;
  line-height: 1.5;
`
