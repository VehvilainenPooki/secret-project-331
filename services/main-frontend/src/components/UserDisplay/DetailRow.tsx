"use client"

import { css } from "@emotion/css"
import React from "react"

import { tones } from "@/shared-module/components/styles/themes"

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid ${tones.toneNeutral26};
        &:last-of-type {
          border-bottom: none;
        }
      `}
    >
      <span
        className={css`
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: ${tones.toneNeutral41};
        `}
      >
        {label}
      </span>
      <span
        className={css`
          font-size: 0.9rem;
          color: ${tones.toneNeutral46};
        `}
      >
        {value}
      </span>
    </div>
  )
}

export default DetailRow
