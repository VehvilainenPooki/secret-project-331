"use client"

import styled from "@emotion/styled"

import { tones } from "@/shared-module/components/styles/themes"

import { respondToOrLarger } from "../../styles/respond"

export const NotificationWrapper = styled.div`
  width: 150px;
  background: ${tones.toneNeutral22};
  height: 50px;

  ${respondToOrLarger.xs} {
    width: 400px;
    height: unset;
    min-height: 100px;
    max-height: 200px;
  }
`
