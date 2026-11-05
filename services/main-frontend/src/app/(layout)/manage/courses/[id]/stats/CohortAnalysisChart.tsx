"use client"

import { css } from "@emotion/css"
import { format } from "date-fns"
import type {
  DefaultLabelFormatterCallbackParams,
  EChartsOption,
  TooltipComponentFormatterCallbackParams,
} from "echarts"
import React, { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"

import Echarts from "@/components/charts/Echarts"
import type { CohortActivity } from "@/generated/api/types.generated"
import { LoadingRegion, Select, ErrorNotice } from "@/shared-module/components"
import { tones } from "@/shared-module/components/styles/themes"
import { useActiveTheme } from "@/shared-module/components/styles/themes/preference"

import { DEFAULT_CHART_HEIGHT, InstructionBox } from "./CourseStatsPage"
import type { Period } from "./LineChart"
import { DAILY_PERIOD, MONTHLY_PERIOD } from "./LineChart"
import StatsHeader from "./StatsHeader"

interface CohortAnalysisFilterValues {
  period: Period
}

interface CohortAnalysisChartProps {
  data: CohortActivity[] | undefined
  isLoading: boolean
  error: Error | undefined | null
  statHeading: string
  instructionText: string
  period?: Period
  setPeriod?: React.Dispatch<React.SetStateAction<Period>>
  disablePeriodSelector?: boolean
}

const FIELD_PERIOD = "period" as const

const CHART_POSITION = "top" as const
const CHART_ORIENTATION = "horizontal" as const
const CHART_ALIGNMENT = "center" as const
const CHART_TYPE = "heatmap" as const
const MONTHLY_DATE_FORMAT = "yyyy-MM" as const
const DAILY_DATE_FORMAT = "yyyy-MM-dd" as const

const CohortAnalysisChart: React.FC<CohortAnalysisChartProps> = ({
  data,
  isLoading,
  error,
  statHeading,
  instructionText,
  period = MONTHLY_PERIOD,
  setPeriod,
  disablePeriodSelector = false,
}) => {
  const { t } = useTranslation()
  // Chart colors are values on a canvas, so the chart redraws when the theme changes.
  const activeTheme = useActiveTheme()

  // Select has no onChange prop, only control/name; the parent (which shares this period
  // across sibling charts) is kept in sync via useWatch + effect instead.
  const { control: filterControl } = useForm<CohortAnalysisFilterValues>({
    defaultValues: { period },
  })
  const watchedPeriod = useWatch({ control: filterControl, name: FIELD_PERIOD })
  useEffect(() => {
    setPeriod?.(watchedPeriod)
  }, [watchedPeriod, setPeriod])

  const processData = (rawData: CohortActivity[] | undefined) => {
    if (!rawData || rawData.length === 0) {
      return { cohorts: [], dayOffsets: [], chartData: [], cohortSizes: {} }
    }

    // Get unique cohort starts and day offsets
    const cohorts = Array.from(new Set(rawData.map((item) => item.cohort_start)))
      .filter((date): date is string => date !== null)
      .toSorted((a, b) => new Date(b).getTime() - new Date(a).getTime()) // Reverse sort - newest first

    const dayOffsets = Array.from(new Set(rawData.map((item) => item.offset)))
      .filter((offset): offset is number => offset !== null)
      .toSorted((a, b) => a - b)

    // Calculate initial size for each cohort (users at offset 0)
    const cohortSizes: Record<string, number> = {}

    for (const cohort of cohorts) {
      const initialData = rawData.find((item) => item.cohort_start === cohort && item.offset === 0)
      cohortSizes[cohort] = initialData?.active_users || 0
    }

    // Create a map of existing data points for quick lookup
    const dataMap = new Map(
      rawData
        .filter((item) => item.cohort_start !== null && item.offset !== null)
        .map((item) => [`${item.cohort_start}-${item.offset}`, item]),
    )

    // Calculate current date to filter out future dates
    const currentDate = new Date()

    // Generate complete chart data including zeros for missing points
    const chartData: [number, number, number, number][] = []

    for (let cohortIndex = 0; cohortIndex < cohorts.length; cohortIndex++) {
      const cohortKey = cohorts[cohortIndex]
      if (cohortKey === undefined) {
        continue
      }
      const cohortDate = new Date(cohortKey)
      const initialSize = cohortSizes[cohortKey] || 1

      for (const offset of dayOffsets) {
        // Calculate if this point would be in the future
        const pointDate = new Date(cohortDate)
        if (period === MONTHLY_PERIOD) {
          pointDate.setMonth(pointDate.getMonth() + offset)
        } else {
          pointDate.setDate(pointDate.getDate() + offset)
        }

        // Only include points that aren't in the future
        if (pointDate <= currentDate) {
          const existingData = dataMap.get(`${cohorts[cohortIndex]}-${offset}`)
          if (existingData) {
            // Use existing data
            const percentRetention = Math.min(
              100,
              initialSize > 0 ? (existingData.active_users / initialSize) * 100 : 0,
            )
            chartData.push([offset, cohortIndex, percentRetention, existingData.active_users])
          } else {
            // Insert zero for missing data
            chartData.push([offset, cohortIndex, 0, 0])
          }
        }
      }
    }

    return { cohorts, dayOffsets, chartData, cohortSizes }
  }

  const { cohorts, dayOffsets, chartData, cohortSizes } = processData(data)

  const chartOptions: EChartsOption = {
    tooltip: {
      position: CHART_POSITION,
      formatter: (params: TooltipComponentFormatterCallbackParams) => {
        if (Array.isArray(params)) {
          throw new TypeError("Tooltip params is an array")
        }
        const tooltipData = params.data as [number, number, number, number]
        const cohortDate = cohorts[tooltipData[1]]
        if (cohortDate === undefined) {
          throw new TypeError("Cohort index out of range")
        }
        const offset = tooltipData[0]
        const percentRetention = tooltipData[2].toFixed(1)
        const activeUsers = tooltipData[3]
        const formattedDate = format(
          new Date(cohortDate),
          period === MONTHLY_PERIOD ? MONTHLY_DATE_FORMAT : DAILY_DATE_FORMAT,
        )
        const initialSize = cohortSizes[cohortDate] || 0

        return t(
          period === MONTHLY_PERIOD
            ? "cohort-analysis-tooltip-monthly-percent"
            : "cohort-analysis-tooltip-daily-percent",
          {
            cohort: formattedDate,
            daysAfterStart: offset,
            monthsAfterStart: offset,
            percent: percentRetention,
            users: activeUsers,
            initialUsers: initialSize,
          },
        )
      },
    },
    grid: {
      height: "70%",
      top: "10%",
      left: "10%",
      right: "5%",
    },
    xAxis: {
      type: "category" as const,
      data: dayOffsets,
      name: t(
        period === MONTHLY_PERIOD ? "stats-axis-months-after-start" : "stats-axis-days-after-start",
      ),
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: "category" as const,
      data: cohorts.map((date) =>
        format(new Date(date), period === MONTHLY_PERIOD ? MONTHLY_DATE_FORMAT : DAILY_DATE_FORMAT),
      ),
      name: t("stats-axis-cohort-start"),
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      type: "continuous",
      min: 0,
      max: 100,
      dimension: 2,
      orient: CHART_ORIENTATION,
      left: CHART_ALIGNMENT,
      bottom: "5%",
      precision: 1,
      itemWidth: 10,
      itemHeight: 200,
      textStyle: {
        color: activeTheme.tones.chartNeutral19,
      },
      inRange: {
        color: [
          activeTheme.tones.chartNeutral5,
          activeTheme.tones.chartNeutral6,
          activeTheme.tones.chartNeutral7,
          activeTheme.tones.chartWarning10,
          activeTheme.tones.chartWarning14,
          activeTheme.tones.chartWarning14,
          activeTheme.tones.chartWarning11,
          activeTheme.tones.chartWarning7,
          activeTheme.tones.chartWarning4,
          activeTheme.tones.chartWarning1,
          activeTheme.tones.chartWarning1,
          activeTheme.tones.chartWarning2,
          activeTheme.tones.chartWarning3,
          activeTheme.tones.chartWarning5,
          activeTheme.tones.chartWarning6,
          activeTheme.tones.chartWarning8,
          activeTheme.tones.chartWarning9,
          activeTheme.tones.chartWarning12,
          activeTheme.tones.chartWarning13,
          activeTheme.tones.chartWarning15,
          activeTheme.tones.chartWarning16,
          activeTheme.tones.chartWarning17,
          activeTheme.tones.chartWarning18,
          activeTheme.tones.chartWarning19,
          activeTheme.tones.chartWarning20,
          activeTheme.tones.chartWarning21,
          activeTheme.tones.chartWarning22,
          activeTheme.tones.chartWarning23,
          activeTheme.tones.chartWarning24,
          activeTheme.tones.chartWarning25,
          activeTheme.tones.chartWarning26,
          activeTheme.tones.chartWarning27,
          activeTheme.tones.chartWarning28,
          activeTheme.tones.chartWarning29,
          activeTheme.tones.chartWarning30,
          activeTheme.tones.chartAccent1,
          activeTheme.tones.chartAccent2,
          activeTheme.tones.chartAccent3,
          activeTheme.tones.chartAccent4,
          activeTheme.tones.chartAccent5,
          activeTheme.tones.chartAccent6,
          activeTheme.tones.chartAccent7,
          activeTheme.tones.chartAccent8,
          activeTheme.tones.chartAccent9,
          activeTheme.tones.chartAccent10,
          activeTheme.tones.chartAccent11,
          activeTheme.tones.chartAccent12,
          activeTheme.tones.chartAccent13,
          activeTheme.tones.chartAccent14,
          activeTheme.tones.chartAccent15,
          activeTheme.tones.chartAccent16,
          activeTheme.tones.chartAccent17,
          activeTheme.tones.chartAccent18,
          activeTheme.tones.chartAccent19,
          activeTheme.tones.chartAccent20,
          activeTheme.tones.chartAccent21,
          activeTheme.tones.chartAccent22,
          activeTheme.tones.chartAccent23,
          activeTheme.tones.chartAccent24,
          activeTheme.tones.chartAccent25,
          activeTheme.tones.chartAccent26,
          activeTheme.tones.chartAccent27,
          activeTheme.tones.chartAccent28,
          activeTheme.tones.chartAccent29,
          activeTheme.tones.chartAccent30,
          activeTheme.tones.chartAccent31,
          activeTheme.tones.chartAccent32,
          activeTheme.tones.chartAccent33,
          activeTheme.tones.chartAccent34,
          activeTheme.tones.chartAccent35,
          activeTheme.tones.chartAccent36,
          activeTheme.tones.chartAccent37,
          activeTheme.tones.chartAccent39,
          activeTheme.tones.chartAccent40,
          activeTheme.tones.chartAccent41,
          activeTheme.tones.chartAccent42,
          activeTheme.tones.chartAccent43,
          activeTheme.tones.chartAccent44,
          activeTheme.tones.chartAccent45,
          activeTheme.tones.chartAccent47,
          activeTheme.tones.chartAccent48,
          activeTheme.tones.chartAccent49,
          activeTheme.tones.chartAccent50,
          activeTheme.tones.chartAccent51,
          activeTheme.tones.chartAccent52,
          activeTheme.tones.chartAccent53,
          activeTheme.tones.chartAccent54,
          activeTheme.tones.chartAccent55,
          activeTheme.tones.chartAccent56,
          activeTheme.tones.chartAccent57,
          activeTheme.tones.chartAccent58,
          activeTheme.tones.chartAccent59,
          activeTheme.tones.chartAccent60,
          activeTheme.tones.chartAccent61,
          activeTheme.tones.chartAccent62,
          activeTheme.tones.chartAccent63,
          activeTheme.tones.chartAccent64,
          activeTheme.tones.chartAccent65,
          activeTheme.tones.chartAccent66,
          activeTheme.tones.chartAccent67,
        ],
      },
      outOfRange: {
        color: [activeTheme.tones.chartNeutral19],
      },
      splitNumber: 10,
    },
    series: [
      {
        name: t("stats-label-retention-rate"),
        type: CHART_TYPE,
        data: chartData,
        label: {
          show: true,
          formatter: (params: DefaultLabelFormatterCallbackParams) => {
            if (!params.data || !Array.isArray(params.data)) {
              return "0%"
            }
            const value = typeof params.data[2] === "number" ? params.data[2] : 0
            return `${value.toFixed(0)}%`
          },
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: activeTheme.tones.chartNeutral1,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: activeTheme.tones.chartNeutral15,
          },
        },
      },
    ],
  }

  return (
    <>
      <StatsHeader heading={statHeading} debugData={data}>
        {!disablePeriodSelector && period && setPeriod && (
          <div
            className={css`
              display: flex;
              align-items: center;
            `}
          >
            <Select
              id="period-select"
              control={filterControl}
              name={FIELD_PERIOD}
              label={t("stats-period-selector-label")}
              options={[
                { value: MONTHLY_PERIOD, label: t("stats-period-monthly") },
                { value: DAILY_PERIOD, label: t("stats-period-daily") },
              ]}
              className={css`
                margin-bottom: 0;
                min-width: 120px;
              `}
            />
          </div>
        )}
      </StatsHeader>
      <InstructionBox>{instructionText}</InstructionBox>
      <div
        className={css`
          margin-bottom: 2rem;
          border: 3px solid ${tones.chartNeutral9};
          border-radius: 6px;
          padding: 1rem;
          min-height: ${DEFAULT_CHART_HEIGHT * 2}px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {isLoading ? (
          <LoadingRegion minHeight={0} />
        ) : error ? (
          <ErrorNotice error={error} />
        ) : !data || data.length < 2 ? (
          <div>{t("no-data")}</div>
        ) : (
          <Echarts options={chartOptions} height={DEFAULT_CHART_HEIGHT * 2} />
        )}
      </div>
    </>
  )
}

export default CohortAnalysisChart
