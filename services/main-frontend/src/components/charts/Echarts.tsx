"use client"

import { css } from "@emotion/css"
import type { EChartsOption } from "echarts"
import React from "react"

import dynamicImport from "@/shared-module/common/utils/dynamicImport"
import withErrorBoundary from "@/shared-module/common/utils/withErrorBoundary"
import { useActiveTheme } from "@/shared-module/components/styles/themes/preference"

const ReactECharts = dynamicImport<{
  option: EChartsOption
  style?: React.CSSProperties | undefined
  theme?: string | Record<string, unknown>
}>(() => import("echarts-for-react"))

export interface EchartsProps {
  options: EChartsOption
  height?: number
}

const Echarts: React.FC<React.PropsWithChildren<EchartsProps>> = ({ options, height = 300 }) => {
  const activeTheme = useActiveTheme()
  const isDark = activeTheme.colorScheme === "dark"
  return (
    <div
      className={css`
        width: 100%;
        /* echarts writes a pixel width onto its own container once initialised, and a chart in a
           grid or flex track would otherwise size the whole page by it. Contained here so no
           consumer has to wrap the chart to stop it. */
        min-width: 0;
        overflow-x: hidden;
      `}
    >
      {/* On a dark theme, echarts' built-in dark theme draws axes, labels and default series in light
          colors; the page's background shows through. Remounting on a theme change also redraws
          colors a chart computed from the active theme. */}
      {/* oxlint-disable-next-line react/forbid-component-props */}
      <ReactECharts
        key={activeTheme.name}
        style={{ height }}
        {...(isDark && { theme: "dark" })}
        option={isDark ? { backgroundColor: "transparent", ...options } : options}
      />
    </div>
  )
}

export default withErrorBoundary(Echarts)
