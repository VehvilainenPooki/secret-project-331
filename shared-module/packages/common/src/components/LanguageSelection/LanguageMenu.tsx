"use client"

import { css } from "@emotion/css"
import React from "react"

export interface LanguageMenuProps {
  visible: boolean
}

const LanguageMenu: React.FC<React.PropsWithChildren<LanguageMenuProps>> = ({
  children,
  visible,
}) => {
  return visible ? (
    <div
      className={css`
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0px 0px 5px var(--tone-shadow-neutral-9);

        li:last-child {
          border: none !important;
        }
      `}
    >
      {children}
    </div>
  ) : null
}

export default LanguageMenu
