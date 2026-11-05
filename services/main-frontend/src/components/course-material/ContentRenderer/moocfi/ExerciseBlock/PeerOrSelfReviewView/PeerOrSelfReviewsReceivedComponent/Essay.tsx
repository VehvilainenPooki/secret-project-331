"use client"

import styled from "@emotion/styled"
import * as React from "react"
import { useTranslation } from "react-i18next"

const Wrapper = styled.div`
  padding: 1rem;

  h4 {
    font-size: 16px !important;
    color: var(--tone-fg-info-11);
    line-height: 1.4;
    margin-bottom: 0.8rem;
    font-weight: 500;
  }

  span {
    color: var(--color-text-muted);
  }
`

interface EssayProps {
  question: string
  index: number
  content: string | number
}

const Essay: React.FunctionComponent<EssayProps> = ({ question, content, index }) => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      {""}
      <h4>{`${t("question")} ${index + 1}: ${question}`}</h4>
      <span>{content}</span>
    </Wrapper>
  )
}

export default Essay
