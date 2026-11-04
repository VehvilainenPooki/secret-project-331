"use client"

import { css, keyframes } from "@emotion/css"
import { Button } from "react-aria-components"

import Idea from "@/img/course-material/idea.svg"
import { tones } from "@/shared-module/components/styles/themes"

const loadAnimation = keyframes`
100%{
      background-position: -100% 0;
  }
`

interface SuggestedMessageChipProps {
  isLoading: boolean
  message: string
  handleClick: () => void
}

const SuggestedMessageChip: React.FC<SuggestedMessageChipProps> = ({
  isLoading,
  message,
  handleClick,
}) => {
  return (
    <Button
      className={css`
        align-self: flex-end;
        text-align: start;
        border: none;
        overflow-wrap: break-word;
        padding: 0.3rem 0.5rem;
        margin: 0.2rem 0;
        border-radius: 12px;
        font-size: 0.8rem;
        background: linear-gradient(
          120deg,
          ${tones.toneInfo5} 30%,
          var(--tone-tone-neutral-1) 38%,
          var(--tone-tone-neutral-16) 40%,
          ${tones.toneInfo5} 48%
        );
        background-size: 200% 100%;
        background-position: 100% 0;
        ${isLoading ? `animation: ${loadAnimation} 2s infinite; color: var(--tone-fg-neutral-1);` : ""}
        &:hover {
          filter: brightness(0.9) contrast(1.1);
          cursor: pointer;
        }
      `}
      onClick={handleClick}
      isDisabled={isLoading}
    >
      <Idea
        className={css`
          position: relative;
          opacity: ${isLoading ? `0%` : "80%"};
          top: 3px;
          margin-right: 5px;
        `}
      />
      <span
        className={css`
          position: relative;
          top: -5px;
        `}
      >
        {message}
      </span>
    </Button>
  )
}

export default SuggestedMessageChip
