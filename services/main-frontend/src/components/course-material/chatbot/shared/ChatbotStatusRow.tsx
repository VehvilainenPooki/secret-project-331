"use client"

import { css } from "@emotion/css"
import React from "react"


import ThinkingIndicator from "./ThinkingIndicator"
import { tones } from "@/shared-module/components/styles/themes"

const statusRowStyle = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0.25rem 0;
  padding: 0.25rem 0.5rem;
  width: fit-content;
  max-width: stretch;
  border-radius: 10px;
  border: 2px dashed ${tones.toneInfo7};
  background-color: ${tones.toneInfo2};
  color: ${tones.toneNeutral44};
`

// No border/background here: with no text, the pill would just be a gray box around three dots.
const bareStyle = css`
  display: flex;
  align-items: center;
  margin: 0.25rem 0;
`

interface ChatbotStatusRowProps {
  /** What the chatbot is doing, already translated. Omitted before Azure has said anything more
   * specific than "the turn started" — claiming e.g. "Thinking" that early would be a guess. */
  text?: string
}

/** What the chatbot is doing right now, shown from the moment a turn starts until it settles. */
const ChatbotStatusRow: React.FC<ChatbotStatusRowProps> = ({ text }) => (
  <div className={text ? statusRowStyle : bareStyle}>
    {text}
    <ThinkingIndicator />
  </div>
)

export default ChatbotStatusRow
