"use client"

import { css, cx } from "@emotion/css"
import React, { useId } from "react"
import { useTranslation } from "react-i18next"

import { colors } from "@/shared-module/components/styles/themes"
import { useThemePreference } from "@/shared-module/components/styles/themes/preference"

const container = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: ${colors.text};
`

const select = css`
  background: ${colors.surface};
  color: ${colors.text};
  border: 1px solid ${colors.borderStrong};
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font: inherit;

  &:focus-visible {
    outline: 2px solid ${colors.focusRing};
    outline-offset: 2px;
  }
`

/** Picks a theme or follows the system setting. Renders nothing while only one theme exists. */
const ThemeSelect: React.FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation()
  const id = useId()
  const { preference, themes, setPreference } = useThemePreference()

  if (themes.length < 2) {
    return null
  }

  const label = (name: string) => {
    switch (name) {
      case "light":
        return t("theme-light")
      case "dark":
        return t("theme-dark")
      default:
        return name
    }
  }

  return (
    <div className={cx(container, className)}>
      <label htmlFor={id}>{t("theme")}</label>
      <select
        id={id}
        className={select}
        value={preference}
        onChange={(event) => setPreference(event.target.value)}
      >
        <option value="system">{t("theme-system")}</option>
        {themes.map((theme) => (
          <option key={theme.name} value={theme.name}>
            {label(theme.name)}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ThemeSelect
