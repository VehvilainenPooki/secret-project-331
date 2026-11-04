"use client"

import { css } from "@emotion/css"

export interface VisibleBlockWrapperProps {
  blockName: string
}

const VisibleBlockWrapper: React.FC<React.PropsWithChildren<VisibleBlockWrapperProps>> = ({
  blockName,
  children,
}) => {
  return (
    <div
      className={css`
        padding: var(--space-4);
        margin: var(--space-4) 0;
        border: 1px solid var(--tone-border-neutral-52);

        h2 {
          margin: 0 0 var(--space-3);
          font-size: 1rem;
          font-weight: 600;
        }
      `}
    >
      <h2>{blockName}</h2>
      {children}
    </div>
  )
}

export default VisibleBlockWrapper
