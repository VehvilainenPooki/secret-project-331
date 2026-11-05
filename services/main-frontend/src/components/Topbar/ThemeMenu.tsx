"use client"

import { css, cx } from "@emotion/css"
import { Moon, Sunny } from "@vectopus/atlas-icons-react"
import React from "react"
import type { Selection } from "react-aria-components"
import { Menu, MenuItem, MenuTrigger, Popover } from "react-aria-components"
import { useTranslation } from "react-i18next"

import { useThemePreference } from "@/shared-module/components/styles/themes/preference"

import { itemRow, popoverStyle } from "../DropdownMenu"
import TopBarMenuButton from "./TopBarMenuButton"

const SYSTEM = "system"

const iconButton = css`
  width: 44px;
  padding: 0;
`

const optionRow = css`
  justify-content: space-between;

  &[data-selected] {
    font-weight: 700;
  }
`

const popover = css`
  min-width: 180px;
`

const Check: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden>
    <path
      d="M4 10.5l4 4 8-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * A sun or moon for the active theme. It opens a menu to pick a theme or follow the system
 * setting. Shown to everyone, signed in or not; hidden while only one theme exists.
 */
const ThemeMenu: React.FC = () => {
  const { t } = useTranslation()
  const { preference, activeTheme, themes, setPreference } = useThemePreference()

  if (themes.length < 2) {
    return null
  }

  const label = (name: string) => {
    switch (name) {
      case SYSTEM:
        return t("theme-system")
      case "light":
        return t("theme-light")
      case "dark":
        return t("theme-dark")
      default:
        return name
    }
  }

  const options = [SYSTEM, ...themes.map((theme) => theme.name)]

  const onSelectionChange = (keys: Selection) => {
    if (keys === "all") {
      return
    }
    const [key] = keys
    if (key !== undefined) {
      setPreference(String(key))
    }
  }

  return (
    <MenuTrigger>
      <TopBarMenuButton
        // oxlint-disable-next-line i18next/no-literal-string
        dataTestId="topbar-theme-menu-button"
        ariaLabel={`${t("theme")}: ${label(preference)}`}
        tooltipText={t("theme")}
        showChevron={false}
        className={iconButton}
      >
        {activeTheme.colorScheme === "dark" ? (
          <Moon size={18} aria-hidden />
        ) : (
          <Sunny size={18} aria-hidden />
        )}
      </TopBarMenuButton>
      <Popover placement="bottom end" offset={8} className={cx(popoverStyle, popover)}>
        <Menu
          // oxlint-disable-next-line i18next/no-literal-string
          data-testid="topbar-theme-menu"
          aria-label={t("theme")}
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[preference]}
          onSelectionChange={onSelectionChange}
          className={css`
            display: flex;
            flex-direction: column;
            gap: 4px;
            outline: none;
          `}
        >
          {options.map((option) => (
            <MenuItem key={option} id={option} className={cx(itemRow, optionRow)}>
              {({ isSelected }) => (
                <>
                  <span>{label(option)}</span>
                  {isSelected && <Check />}
                </>
              )}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}

export default ThemeMenu
