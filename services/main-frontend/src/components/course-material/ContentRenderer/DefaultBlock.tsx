"use client"

import { css } from "@emotion/css"

import type { BlockAttributes } from "@/../types/GutenbergBlockAttributes"
import withErrorBoundary from "@/shared-module/common/utils/withErrorBoundary"

import type { BlockRendererProps } from "."
import { tones } from "@/shared-module/components/styles/themes"

const DefaultBlock: React.FC<React.PropsWithChildren<BlockRendererProps<BlockAttributes>>> = ({
  data,
}) => {
  return (
    <div
      className={css`
        padding: 1rem;
        border: 1px solid ${tones.toneNeutral39};
      `}
    >
      <b>{data.name}</b>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>
  )
}

export default withErrorBoundary(DefaultBlock)
