"use client"

import styled from "@emotion/styled"

import { tones } from "@/shared-module/components/styles/themes"

export { DEFAULT_CHART_HEIGHT } from "./constants"

export const InstructionBox = styled.div`
  background-color: ${tones.toneNeutral12};
  border-left: 4px solid ${tones.toneInfo23};
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 4px;
  color: ${tones.toneNeutral44};
  font-size: 0.9rem;
  line-height: 1.5;
`
