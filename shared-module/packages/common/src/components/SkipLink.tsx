"use client"

import styled from "@emotion/styled"

import { tones } from "@/shared-module/components/styles/themes"

const SkipLink = styled.a`
  background: ${tones.toneAccent21};
  color: ${tones.toneNeutral12};
  font-weight: 700;
  left: 50%;
  padding: 6px;
  position: absolute;
  top: 3px;
  transform: translateY(-150%);
  text-decoration: none;
  z-index: 100000;

  &:focus {
    transform: translateY(0%);
  }
`

export default SkipLink
