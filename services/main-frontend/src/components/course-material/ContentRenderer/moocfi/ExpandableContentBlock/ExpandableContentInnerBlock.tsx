"use client"

import { css } from "@emotion/css"
import { MinusCircle, PlusCircle } from "@vectopus/atlas-icons-react"
import React, { useState } from "react"

import InnerBlocks from "@/components/course-material/ContentRenderer/util/InnerBlocks"
import { fontWeights, headingFont } from "@/shared-module/common/styles"
import withErrorBoundary from "@/shared-module/common/utils/withErrorBoundary"

import type { BlockRendererProps } from "../.."
import { tones } from "@/shared-module/components/styles/themes"

interface ExpandableContentInnerBlockProps {
  name: string
}

const ExpandableContentInnerBlock: React.FC<
  React.PropsWithChildren<BlockRendererProps<ExpandableContentInnerBlockProps>>
> = (props) => {
  const heading = props.data.attributes.name

  const [open, setOpen] = useState(false)
  const reactId = React.useId()
  // eslint-disable-next-line i18next/no-literal-string
  const headingId = `expandable-heading-${reactId}`
  // eslint-disable-next-line i18next/no-literal-string
  const panelId = `expandable-panel-${reactId}`
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: 4px;
        background: var(--tone-bg-neutral-47);
      `}
    >
      <h4
        id={headingId}
        className={css`
          margin: 0;
          font-weight: ${fontWeights.semibold};
        `}
      >
        <button
          type="button"
          className={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            font-family: ${headingFont};
            font-weight: inherit;
            font-size: inherit;
            color: var(--tone-fg-info-10);
            cursor: pointer;
            border: 0;
            width: 100%;
            text-align: left;
            background: transparent;
            ${open ? "padding-bottom: 1rem;" : ""}
          `}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <MinusCircle size={18} className={css`
              color: ${tones.fgInfo10};
            `} />
          ) : (
            <PlusCircle size={18} className={css`
              color: ${tones.fgInfo10};
            `} />
          )}
          {heading}
        </button>
      </h4>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          className={css`
            background: ${tones.toneNeutral1};
            border-radius: 2px;

            p,
            h1 {
              margin: 9px 21px 9px 16px;
            }
          `}
        >
          <InnerBlocks parentBlockProps={props} dontAllowInnerBlocksToBeWiderThanParentBlock />
        </div>
      )}
    </div>
  )
}

const exported = withErrorBoundary(ExpandableContentInnerBlock)
// @ts-expect-error: Custom property
exported.dontUseDefaultBlockMargin = true

export default exported
