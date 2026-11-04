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

import { DEFAULT_CHART_HEIGHT, InstructionBox } from "./CourseStatsPage"
import type { Period } from "./LineChart"
import { DAILY_PERIOD, MONTHLY_PERIOD } from "./LineChart"
import StatsHeader from "./StatsHeader"
import { getActiveTheme, tones } from "@/shared-module/components/styles/themes"

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
        color: getActiveTheme().tones.chartNeutral19,
      },
      inRange: {
        color: [
          getActiveTheme().tones.chartNeutral5,
          getActiveTheme().tones.chartNeutral6,
          getActiveTheme().tones.chartNeutral7,
          getActiveTheme().tones.chartWarning10,
          getActiveTheme().tones.chartWarning14,
          getActiveTheme().tones.chartWarning14,
          getActiveTheme().tones.chartWarning11,
          getActiveTheme().tones.chartWarning7,
          getActiveTheme().tones.chartWarning4,
          getActiveTheme().tones.chartWarning1,
          getActiveTheme().tones.chartWarning1,
          getActiveTheme().tones.chartWarning2,
          getActiveTheme().tones.chartWarning3,
          getActiveTheme().tones.chartWarning5,
          getActiveTheme().tones.chartWarning6,
          getActiveTheme().tones.chartWarning8,
          getActiveTheme().tones.chartWarning9,
          getActiveTheme().tones.chartWarning12,
          getActiveTheme().tones.chartWarning13,
          getActiveTheme().tones.chartWarning15,
          getActiveTheme().tones.chartWarning16,
          getActiveTheme().tones.chartWarning17,
          getActiveTheme().tones.chartWarning18,
          getActiveTheme().tones.chartWarning19,
          getActiveTheme().tones.chartWarning20,
          getActiveTheme().tones.chartWarning21,
          getActiveTheme().tones.chartWarning22,
          getActiveTheme().tones.chartWarning23,
          getActiveTheme().tones.chartWarning24,
          getActiveTheme().tones.chartWarning25,
          getActiveTheme().tones.chartWarning26,
          getActiveTheme().tones.chartWarning27,
          getActiveTheme().tones.chartWarning28,
          getActiveTheme().tones.chartWarning29,
          getActiveTheme().tones.chartWarning30,
          getActiveTheme().tones.chartAccent1,
          getActiveTheme().tones.chartAccent2,
          getActiveTheme().tones.chartAccent3,
          getActiveTheme().tones.chartAccent4,
          getActiveTheme().tones.chartAccent5,
          getActiveTheme().tones.chartAccent6,
          getActiveTheme().tones.chartAccent7,
          getActiveTheme().tones.chartAccent8,
          getActiveTheme().tones.chartAccent9,
          getActiveTheme().tones.chartAccent10,
          getActiveTheme().tones.chartAccent11,
          getActiveTheme().tones.chartAccent12,
          getActiveTheme().tones.chartAccent13,
          getActiveTheme().tones.chartAccent14,
          getActiveTheme().tones.chartAccent15,
          getActiveTheme().tones.chartAccent16,
          getActiveTheme().tones.chartAccent17,
          getActiveTheme().tones.chartAccent18,
          getActiveTheme().tones.chartAccent19,
          getActiveTheme().tones.chartAccent20,
          getActiveTheme().tones.chartAccent21,
          getActiveTheme().tones.chartAccent22,
          getActiveTheme().tones.chartAccent23,
          getActiveTheme().tones.chartAccent24,
          getActiveTheme().tones.chartAccent25,
          getActiveTheme().tones.chartAccent26,
          getActiveTheme().tones.chartAccent27,
          getActiveTheme().tones.chartAccent28,
          getActiveTheme().tones.chartAccent29,
          getActiveTheme().tones.chartAccent30,
          getActiveTheme().tones.chartAccent31,
          getActiveTheme().tones.chartAccent32,
          getActiveTheme().tones.chartAccent33,
          getActiveTheme().tones.chartAccent34,
          getActiveTheme().tones.chartAccent35,
          getActiveTheme().tones.chartAccent36,
          getActiveTheme().tones.chartAccent37,
          getActiveTheme().tones.chartAccent39,
          getActiveTheme().tones.chartAccent40,
          getActiveTheme().tones.chartAccent41,
          getActiveTheme().tones.chartAccent42,
          getActiveTheme().tones.chartAccent43,
          getActiveTheme().tones.chartAccent44,
          getActiveTheme().tones.chartAccent45,
          getActiveTheme().tones.chartAccent47,
          getActiveTheme().tones.chartAccent48,
          getActiveTheme().tones.chartAccent49,
          getActiveTheme().tones.chartAccent50,
          getActiveTheme().tones.chartAccent51,
          getActiveTheme().tones.chartAccent52,
          getActiveTheme().tones.chartAccent53,
          getActiveTheme().tones.chartAccent54,
          getActiveTheme().tones.chartAccent55,
          getActiveTheme().tones.chartAccent56,
          getActiveTheme().tones.chartAccent57,
          getActiveTheme().tones.chartAccent58,
          getActiveTheme().tones.chartAccent59,
          getActiveTheme().tones.chartAccent60,
          getActiveTheme().tones.chartAccent61,
          getActiveTheme().tones.chartAccent62,
          getActiveTheme().tones.chartAccent63,
          getActiveTheme().tones.chartAccent64,
          getActiveTheme().tones.chartAccent65,
          getActiveTheme().tones.chartAccent66,
          getActiveTheme().tones.chartAccent67,
        ],
      },
      outOfRange: {
        color: [getActiveTheme().tones.chartNeutral19],
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
          borderColor: getActiveTheme().tones.chartNeutral1,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: getActiveTheme().tones.chartNeutral15,
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
