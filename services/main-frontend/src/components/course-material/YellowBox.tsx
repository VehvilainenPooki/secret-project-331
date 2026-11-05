"use client"

import styled from "@emotion/styled"

import { tones } from "@/shared-module/components/styles/themes"

const YellowBox = styled.div`
  padding: 1rem;
  background-color: ${tones.toneWarning5};
  color: var(--tone-fg-warning-7);
  margin: 1rem 0;
  font-size: 1rem;
  line-height: 140%;
  text-align: center;
  border-radius: 0.25rem;
`

export default YellowBox
