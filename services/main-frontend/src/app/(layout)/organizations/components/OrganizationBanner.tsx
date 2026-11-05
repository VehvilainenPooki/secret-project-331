"use client"

import { css } from "@emotion/css"
import { ApartmentBuilding, Gear } from "@vectopus/atlas-icons-react"
import React from "react"
import { useTranslation } from "react-i18next"

import { LINK_INHERIT } from "@/components/credit-registration/constants"
import OnlyRenderIfPermissions from "@/shared-module/common/components/OnlyRenderIfPermissions"
import { primaryFont } from "@/shared-module/common/styles"
import { respondToOrLarger } from "@/shared-module/common/styles/respond"
import { omitUndefined } from "@/shared-module/common/utils/nullability"
import {
  manageOrganizationRoute,
  organizationFrontPageRoute,
} from "@/shared-module/common/utils/routes"
import { Link } from "@/shared-module/components"
import { tones } from "@/shared-module/components/styles/themes"

interface Props {
  organization: {
    id: string
    name: string
    slug: string
    hidden?: boolean
  }
}

const OrganizationBanner: React.FC<Props> = ({ organization }) => {
  const { t } = useTranslation()

  return (
    <div
      key={organization.id}
      aria-label={organization.name || organization.slug}
      className={css`
        padding: 0em 0.4em;
        color: var(--tone-fg-neutral-27);

        &:focus-visible > div {
          outline: 2px solid ${tones.toneAccent19};
          outline-offset: 2px;
        }

        &:focus {
          outline: none;
        }

        ${respondToOrLarger.lg} {
          padding: 0em 1em;
        }
      `}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--color-surface);
          padding: 0.25rem 0.5rem;
          gap: 0.3rem;
          width: 100%;

          ${respondToOrLarger.lg} {
            height: 3.5rem;
            padding: 0.5rem 1rem;
            gap: 0.5rem;
          }
        `}
      >
        <OrganizationIcon />
        <OrganizationText
          name={organization.name || organization.slug}
          {...omitUndefined({ hidden: organization.hidden })}
        />
        <div
          className={css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-left: auto;
            margin-right: 1rem;
          `}
        >
          <OnlyRenderIfPermissions
            action={{ type: "create_courses_or_exams" }}
            resource={{ type: "organization", id: organization.id }}
          >
            <Link
              appearance={LINK_INHERIT}
              href={manageOrganizationRoute(organization.id)}
              aria-label={t("label-manage-organization", {
                name: organization.name,
                defaultValue: `Manage organization ${organization.name}`,
              })}
              className={css`
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background-color: var(--tone-bg-neutral-50);
                border: none;
                margin-right: 0.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;

                &:hover {
                  background-color: var(--tone-bg-neutral-68);
                }
              `}
            >
              <Gear
                className={css`
                  width: 14px;
                  height: 13px;
                  color: var(--color-text);
                `}
              />
            </Link>
          </OnlyRenderIfPermissions>

          <Link
            href={organizationFrontPageRoute(organization.slug)}
            styledAsButton
            variant="secondary"
            size="medium"
          >
            {t("label-select")}
          </Link>
        </div>
      </div>
    </div>
  )
}

const OrganizationIcon: React.FC = () => (
  <div
    className={css`
      background: var(--tone-bg-neutral-90);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 27px;
      min-width: 27px;
      height: 26px;
      padding: 4px;
      border-radius: 2px;
      margin-left: 0rem;

      ${respondToOrLarger.lg} {
        margin-left: 0.75rem;
      }
    `}
  >
    <ApartmentBuilding
      className={css`
        width: 21px;
        height: 20px;
        color: var(--color-text-on-accent);
        display: block;
        margin: auto;
        object-fit: contain;
        padding: 1px;
      `}
    />
  </div>
)

const OrganizationText: React.FC<{ name: string; hidden?: boolean }> = ({ name, hidden }) => {
  const { t } = useTranslation()

  return (
    <div
      className={css`
        flex-grow: 1;
        min-width: 0;
        padding: 0.5rem 0.5rem;

        ${respondToOrLarger.lg} {
          padding: 0.5rem 1rem;
        }
      `}
    >
      <h2
        className={css`
          color: ${hidden ? tones.fgNeutral25 : tones.fgNeutral36};
          font-family: ${primaryFont};
          font-size: 15px;
          line-height: 1.1;
          text-transform: capitalize;

          ${respondToOrLarger.lg} {
            font-size: 18px;
            line-height: 1.3;
          }
        `}
      >
        {name} {hidden && `(${t("label-hidden")})`}
      </h2>
    </div>
  )
}

export default OrganizationBanner
