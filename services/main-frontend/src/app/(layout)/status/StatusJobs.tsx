"use client"

import { css } from "@emotion/css"
import { CheckCircle, Clock, XmarkCircle } from "@vectopus/atlas-icons-react"
import React from "react"
import { useTranslation } from "react-i18next"

import { DENSITY_COMPACT } from "@/components/credit-registration/constants"
import { useStatusJobs } from "@/hooks/useStatusJobs"
import { QueryResult, Table } from "@/shared-module/components"
import { tones } from "@/shared-module/components/styles/themes"

const iconRowCss = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const StatusJobs: React.FC = () => {
  const { t } = useTranslation()
  const statusJobsQuery = useStatusJobs()

  return (
    <QueryResult query={statusJobsQuery} emptyFallback={<p>{t("status-no-jobs-found")}</p>}>
      {(jobs) => (
        <Table
          caption={t("status-jobs")}
          density={DENSITY_COMPACT}
          rowHover
          rows={jobs}
          rowKey={(job) => job.name}
          className={css`
            margin-top: 1rem;
          `}
          columns={[
            { header: t("status-name"), cell: (job) => job.name },
            {
              header: t("status-succeeded"),
              cell: (job) => (
                <div className={iconRowCss}>
                  {(job.succeeded ?? 0) > 0 && <CheckCircle size={16} color={tones.toneAccent21} />}
                  <span
                    className={css`
                      color: ${tones.toneAccent21};
                      font-weight: ${(job.succeeded ?? 0) > 0 ? "600" : "normal"};
                    `}
                  >
                    {job.succeeded ?? 0}
                  </span>
                </div>
              ),
            },
            {
              header: t("status-failed-count"),
              cell: (job) => {
                const hasFailures = (job.failed ?? 0) > 0
                return (
                  <div className={iconRowCss}>
                    {hasFailures && <XmarkCircle size={16} color={tones.toneDanger17} />}
                    <span
                      className={css`
                        color: ${tones.toneDanger17};
                        font-weight: ${hasFailures ? "600" : "normal"};
                      `}
                    >
                      {job.failed ?? 0}
                    </span>
                  </div>
                )
              },
            },
            {
              header: t("status-active"),
              cell: (job) => {
                const isActive = (job.active ?? 0) > 0
                return (
                  <div className={iconRowCss}>
                    {isActive && <Clock size={16} color={tones.toneInfo26} />}
                    <span
                      className={css`
                        color: ${tones.toneInfo26};
                        font-weight: ${isActive ? "600" : "normal"};
                      `}
                    >
                      {job.active ?? 0}
                    </span>
                  </div>
                )
              },
            },
          ]}
        />
      )}
    </QueryResult>
  )
}

export default StatusJobs
