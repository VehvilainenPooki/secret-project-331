"use client"

import { css } from "@emotion/css"
import { animated, useSpring } from "@react-spring/web"

import ArrowDown from "@/shared-module/common/img/caret-arrow-down.svg"
import ArrowUp from "@/shared-module/common/img/caret-arrow-up.svg"
import { headingFont } from "@/shared-module/common/styles"
import { runCallbackIfEnterPressed } from "@/shared-module/common/utils/accessibility"
import { tones } from "@/shared-module/components/styles/themes"

const AnimatedDiv = animated("div")

// This should be replaced once the issues with the shared module one are resolved.
// (it seems to only render child components)
const TempAccordion: React.FC<
  React.PropsWithChildren<{ title: string; open: boolean; onClick: () => void }>
> = ({ title, open, onClick, children }) => {
  const openAnimation = useSpring({
    to: { opacity: open ? 1 : 0 },
    from: { opacity: open ? 0 : 1 },
    duration: 2000,
  })

  return (
    <div>
      <div
        onClick={onClick}
        onKeyDown={(e) => runCallbackIfEnterPressed(e, onClick)}
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- styled clickable div; native button changes styling
        role="button"
        tabIndex={0}
        className={css`
          background-color: var(--tone-bg-info-2);
          font-family: ${headingFont};
          margin-bottom: ${open ? "3px" : "6px"};
          cursor: pointer;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          padding: 1rem 2rem;

          &:hover {
            background: var(--tone-bg-neutral-49);
          }
        `}
      >
        <div
          className={css`
            flex: 1;
            font-weight: 500;
            color: ${tones.toneNeutral46};
            opacity: 0.9;
          `}
        >
          {title}
        </div>
        {open ? (
          <ArrowUp
            className={css`
              margin-top: 8px;
              transform: scale(1.6);
            `}
          />
        ) : (
          <ArrowDown
            className={css`
              margin-top: 8px;
              transform: scale(1.6);
            `}
          />
        )}
      </div>
      {/* oxlint-disable-next-line react/forbid-component-props */}
      {open ? <AnimatedDiv style={openAnimation}>{children}</AnimatedDiv> : null}
    </div>
  )
}

export default TempAccordion
