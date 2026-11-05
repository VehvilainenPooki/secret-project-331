"use client"

import { css } from "@emotion/css"
import { format } from "date-fns"
import type { Color, EChartsOption, TooltipComponentFormatterCallbackParams } from "echarts"
import React, { useEffect, useMemo, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"

import Echarts from "@/components/charts/Echarts"
import type { CountResult } from "@/generated/api/types.generated"
import useCourseInstancesQuery from "@/hooks/useCourseInstancesQuery"
import { LoadingRegion, Select, ErrorNotice } from "@/shared-module/components"
import { getActiveTheme, tones } from "@/shared-module/components/styles/themes"

import { DEFAULT_CHART_HEIGHT, InstructionBox } from "./CourseStatsPage"
import type { Period } from "./LineChart"
import { DAILY_PERIOD, MONTHLY_PERIOD } from "./LineChart"
import StatsHeader from "./StatsHeader"

interface LineChartByInstanceFilterValues {
  period: Period
}

interface LineChartByInstanceProps {
  courseId: string
  data: Record<string, CountResult[]> | undefined
  isLoading: boolean
  error: Error | undefined | null
  period: Period
  setPeriod: React.Dispatch<React.SetStateAction<Period>>
  yAxisName: string
  tooltipValueLabel: string
  dateFormat: string
  statHeading: string
  instructionText: string
  disablePeriodSelector?: boolean
}

const AXIS = "axis"
const DATA_MAX = "dataMax"
const DATA_MIN = "dataMin"
const FIELD_PERIOD = "period" as const

const tooltipRow = css`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
  font-size: 14px;
`

const tooltipLabel = css`
  margin-right: 15px;
  display: flex;
  align-items: center;
`

const getTooltipDotStyle = (color: Color | undefined) => css`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${typeof color === "object" ? tones.bgNeutral94 : (color ?? tones.bgNeutral94)};
`

const tooltipContainer = css`
  padding: 4px 8px;
  min-width: 200px;
`

const tooltipHeader = css`
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--tone-chart-neutral-10);
  font-weight: bold;
`

const tooltipValue = css`
  font-weight: bold;
`

const chartContainer = css`
  margin-bottom: 2rem;
  border: 3px solid ${tones.chartNeutral9};
  border-radius: 6px;
  padding: 1rem;
  min-height: ${DEFAULT_CHART_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const headerContainer = css`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const getLogScaleButtonStyles = (isLogScale: boolean) => css`
  padding: 0.15rem 0.4rem;
  border: 1px solid ${isLogScale ? tones.chartInfo4 : tones.chartNeutral11};
  border-radius: 12px;
  background: ${isLogScale ? tones.chartInfo4 : tones.chartNeutral9};
  cursor: pointer;
  font-size: 11px;
  color: ${isLogScale ? tones.chartNeutral1 : tones.chartNeutral18};
  transition: all 0.15s ease-in-out;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  box-shadow: ${isLogScale ? "inset 0 1px 1px var(--tone-chart-neutral-10)" : "none"};

  &:hover {
    background: ${isLogScale ? tones.chartInfo5 : tones.chartNeutral11};
    border-color: ${isLogScale ? tones.chartInfo5 : tones.chartNeutral12};
  }

  &:active {
    transform: scale(0.96);
    box-shadow: inset 0 1px 2px var(--tone-chart-neutral-13);
  }
`

const periodSelect = css`
  margin-bottom: 0;
  min-width: 120px;
`

const LineChartByInstance: React.FC<LineChartByInstanceProps> = ({
  courseId,
  data,
  isLoading,
  error,
  period,
  setPeriod,
  yAxisName,
  tooltipValueLabel,
  dateFormat,
  statHeading,
  instructionText,
  disablePeriodSelector = false,
}) => {
  const { t } = useTranslation()
  const courseInstancesQuery = useCourseInstancesQuery(courseId)
  const [isLogScale, setIsLogScale] = useState(false)

  // Select has no onChange prop, only control/name; the parent (which shares this period
  // across sibling charts) is kept in sync via useWatch + effect instead.
  const { control: filterControl } = useForm<LineChartByInstanceFilterValues>({
    defaultValues: { period },
  })
  const watchedPeriod = useWatch({ control: filterControl, name: FIELD_PERIOD })
  useEffect(() => {
    setPeriod(watchedPeriod)
  }, [watchedPeriod, setPeriod])

  const instanceMap = useMemo(() => {
    if (!courseInstancesQuery.data) {
      return new Map()
    }
    return new Map(courseInstancesQuery.data.map((instance) => [instance.id, instance]))
  }, [courseInstancesQuery.data])

  const chartOptions: EChartsOption = useMemo(() => {
    if (!data) {
      return {}
    }

    const getInstanceName = (instanceId: string) => {
      const instance = instanceMap.get(instanceId)
      if (!instance) {
        return instanceId
      }
      return instance.name || t("default-instance")
    }

    // Get all unique dates across all instances
    const allDates = new Set<string>()
    Object.values(data).forEach((instanceData) => {
      instanceData.forEach((item) => {
        if (item.period) {
          try {
            allDates.add(format(new Date(item.period), dateFormat))
          } catch {
            allDates.add(item.period)
          }
        }
      })
    })

    const sortedDates = Array.from(allDates).toSorted()

    // Create series for each instance with their data
    const seriesWithData = Object.entries(data).map(([instanceId, instanceData]) => {
      const countByDate = new Map(
        instanceData.map((item) => {
          const date = item.period ? format(new Date(item.period), dateFormat) : ""
          return [date, item.count]
        }),
      )

      // When in log scale, replace zeros with null to create gaps in the line
      const values = sortedDates.map((date) => {
        const value = countByDate.get(date) || 0
        return isLogScale && value <= 0 ? null : value
      })

      // Find the last date with actual data (not a filled-in zero)
      let lastDataIndex = -1
      for (let i = 0; i < sortedDates.length; i++) {
        const sortedDate = sortedDates[i]
        if (sortedDate !== undefined && countByDate.has(sortedDate)) {
          lastDataIndex = i
        }
      }

      // If instance has data for the latest date, use that value for sorting
      // Otherwise, it should be ranked lower (use negative value as penalty)
      const isLatestDateMissing = lastDataIndex < sortedDates.length - 1
      const lastValue = lastDataIndex >= 0 ? values[lastDataIndex] : 0

      return {
        name: getInstanceName(instanceId),
        type: "line" as const,
        data: values,
        connectNulls: false, // Don't connect across null values
        sortValue: isLatestDateMissing ? -1 : lastValue, // Instances missing end data sorted last
        triggerLineEvent: true,
      }
    })

    // Sort series by sortValue in descending order, then alphabetically by name
    const series = seriesWithData
      .toSorted((a, b) => {
        // First compare by sortValue
        if (b.sortValue !== a.sortValue) {
          return (b.sortValue ?? -1) - (a.sortValue ?? -1)
        }
        // If sortValues are equal, sort alphabetically by name
        return a.name.localeCompare(b.name)
      })
      .map(({ name, type, data: seriesData }) => ({ name, type, data: seriesData }))

    return {
      color: [
        getActiveTheme().tones.chartInfo4,
        getActiveTheme().tones.chartAccent69,
        getActiveTheme().tones.chartDanger11,
        getActiveTheme().tones.chartWarning31,
        getActiveTheme().tones.chartSpecial4,
        getActiveTheme().tones.chartNeutral16,
        getActiveTheme().tones.chartInfo1,
        getActiveTheme().tones.chartAccent38,
        getActiveTheme().tones.chartDanger2,
        getActiveTheme().tones.chartAccent46,
        getActiveTheme().tones.chartAccent70,
        getActiveTheme().tones.chartSpecial1,
        getActiveTheme().tones.chartInfo6,
        getActiveTheme().tones.chartAccent68,
        getActiveTheme().tones.chartDanger3,
        getActiveTheme().tones.chartWarning34,
        getActiveTheme().tones.chartDanger1,
        getActiveTheme().tones.chartInfo3,
        getActiveTheme().tones.chartDanger5,
        getActiveTheme().tones.chartDanger4,
        getActiveTheme().tones.chartSpecial2,
        getActiveTheme().tones.chartAccent72,
        getActiveTheme().tones.chartWarning35,
        getActiveTheme().tones.chartDanger7,
        getActiveTheme().tones.chartAccent71,
        getActiveTheme().tones.chartDanger6,
        getActiveTheme().tones.chartInfo2,
        getActiveTheme().tones.chartWarning33,
        getActiveTheme().tones.chartSpecial3,
        getActiveTheme().tones.chartWarning36,
      ],
      xAxis: {
        type: "category" as const,
        data: sortedDates,
      },
      yAxis: {
        name: yAxisName,
        scale: true,
        type: isLogScale ? "log" : "value",
        logBase: 10,
        minorTick: {
          show: false,
        },
        minorSplitLine: {
          show: false,
        },
        min: DATA_MIN,
        max: DATA_MAX,
      },
      series,
      tooltip: {
        trigger: AXIS,
        formatter: (params: TooltipComponentFormatterCallbackParams) => {
          if (!Array.isArray(params)) {
            throw new TypeError("Tooltip params is not an array")
          }
          const firstParam = params[0]
          if (firstParam === undefined) {
            throw new TypeError("Tooltip params is empty")
          }
          const date = firstParam.name
          const rows = params
            .map((p) => {
              const value = Math.round(Number(p.value ?? 0)).toLocaleString()
              // oxlint-disable-next-line i18next/no-literal-string
              return `
                <div class="${tooltipRow}">
                  <span class="${tooltipLabel}">
                    <span class="${getTooltipDotStyle(p.color)}"></span>
                    ${p.seriesName}
                  </span>
                  <span class="${tooltipValue}">${value} ${tooltipValueLabel.toLocaleLowerCase()}</span>
                </div>`
            })
            .join("")

          // oxlint-disable-next-line i18next/no-literal-string
          return `
            <div class="${tooltipContainer}">
              <div class="${tooltipHeader}">
                ${date}
              </div>
              ${rows}
            </div>`
        },
        backgroundColor: getActiveTheme().tones.chartNeutral3,
        borderWidth: 0,
        shadowBlur: 10,
        shadowColor: getActiveTheme().tones.chartNeutral14,
        shadowOffsetX: 1,
        shadowOffsetY: 2,
        textStyle: {
          color: getActiveTheme().tones.chartNeutral19,
        },
        padding: 0,
      },
      legend: {
        type: "scroll" as const,
        // oxlint-disable-next-line i18next/no-literal-string
        orient: "horizontal" as const,
        bottom: 0,
      },
    }
  }, [data, yAxisName, isLogScale, instanceMap, t, dateFormat, tooltipValueLabel])

  const isDataEmpty =
    !data || Object.keys(data).length === 0 || Object.values(data).every((arr) => arr.length < 2)

  return (
    <>
      <StatsHeader heading={statHeading} debugData={data}>
        <div className={headerContainer}>
          <button
            onClick={() => setIsLogScale(!isLogScale)}
            className={getLogScaleButtonStyles(isLogScale)}
          >
            {t("log-scale-short")}
          </button>
          {!disablePeriodSelector && (
            <Select
              id="period-select"
              control={filterControl}
              name={FIELD_PERIOD}
              label={t("stats-period-selector-label")}
              options={[
                { value: MONTHLY_PERIOD, label: t("stats-period-monthly") },
                { value: DAILY_PERIOD, label: t("stats-period-daily") },
              ]}
              className={periodSelect}
            />
          )}
        </div>
      </StatsHeader>
      <InstructionBox>{instructionText}</InstructionBox>
      <div className={chartContainer}>
        {isLoading || courseInstancesQuery.isLoading ? (
          <LoadingRegion minHeight={0} />
        ) : error || courseInstancesQuery.error ? (
          <ErrorNotice error={error || courseInstancesQuery.error} />
        ) : isDataEmpty ? (
          <div>{t("no-data")}</div>
        ) : (
          <Echarts options={chartOptions} height={DEFAULT_CHART_HEIGHT} />
        )}
      </div>
    </>
  )
}

export default LineChartByInstance
