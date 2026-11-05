"use client"

import { css } from "@emotion/css"
import React from "react"

import BreakFromCentered from "@/shared-module/common/components/Centering/BreakFromCentered"
import Centered from "@/shared-module/common/components/Centering/Centered"
import withErrorBoundary from "@/shared-module/common/utils/withErrorBoundary"
import { themeForAuthorBackground } from "@/shared-module/components/styles/themes"

import type { BlockRendererProps } from ".."
import InnerBlocks from "../util/InnerBlocks"

interface LogoLinkBlockAttributes {
  backgroundColor: string
  noPadding: boolean
}

const LogoLink: React.FC<React.PropsWithChildren<BlockRendererProps<LogoLinkBlockAttributes>>> = (
  props,
) => {
  return (
    <BreakFromCentered sidebar={false}>
      <div
        data-theme={themeForAuthorBackground(props.data.attributes.backgroundColor)}
        className={css`
          ${!props.data.attributes.noPadding && `padding: 3rem;`}
          background-color: ${props.data.attributes.backgroundColor};
        `}
      >
        <Centered variant="narrow">
          <InnerBlocks parentBlockProps={props} dontAllowInnerBlocksToBeWiderThanParentBlock />
        </Centered>
      </div>
    </BreakFromCentered>
  )
}

export default withErrorBoundary(LogoLink)
