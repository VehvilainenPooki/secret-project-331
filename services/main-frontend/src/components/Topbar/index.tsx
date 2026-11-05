"use client"

import { css } from "@emotion/css"
import { OverlayContainer } from "@react-aria/overlays"
import { useOverlayTriggerState } from "@react-stately/overlays"
import type { ReactElement } from "react"
import React, { useContext } from "react"
import { Separator } from "react-aria-components"
import { useTranslation } from "react-i18next"

import LoginStateContext from "@/shared-module/common/contexts/LoginStateContext"
import { respondToOrLarger } from "@/shared-module/common/styles/respond"
import { omitUndefined } from "@/shared-module/common/utils/nullability"
import { useCurrentPagePathForReturnTo } from "@/shared-module/common/utils/redirectBackAfterLoginOrSignup"
import { loginRoute, signUpRoute } from "@/shared-module/common/utils/routes"

import Brand from "./Brand"
import LanguageMenu from "./LanguageMenu"
import { MobileMenuButton } from "./MobileMenu/MobileMenuButton"
import { MobileMenuOverlay } from "./MobileMenu/MobileMenuOverlay"
import QuickActionsMenu from "./QuickActionsMenu"
import SearchButton from "./SearchButton"
import ThemeMenu from "./ThemeMenu"
import UserMenu from "./UserMenu"

interface MenuOption {
  type: "link" | "action" | "separator"
  label?: string
  href?: string
  onAction?: () => void
  icon?: ReactElement
  isDestructive?: boolean
  requiresPermission?: boolean
  permissionAction?: string
  permissionResource?: string
}

/**
 * Configurable Topbar component with feature toggles and custom menu options
 *
 * @example
 * // Basic usage with all features enabled
 * <Topbar courseId="123" organizationSlug="org" currentPagePath="/course" />
 *
 * @example
 * // Minimal topbar for non-course pages
 * <Topbar
 *   enableSearch={false}
 *   enableLanguageMenu={true}
 *   enableUserMenu={true}
 *   enableQuickActions={false}
 * />
 *
 * @example
 * // Custom user menu options
 * <Topbar
 *   userMenuOptions={[
 *     { type: "link", label: "Profile", href: "/profile", icon: <UserIcon /> },
 *     { type: "separator" },
 *     { type: "action", label: "Logout", onAction: handleLogout, isDestructive: true }
 *   ]}
 * />
 *
 * @example
 * // Language menu with custom options for non-course pages
 * <Topbar
 *   courseId={null}
 *   enableLanguageMenu={true}
 *   languageMenuProps={{
 *     availableLanguages: [
 *       { code: "en", name: "English" },
 *       { code: "fi", name: "Finnish" }
 *     ],
 *     onLanguageChange: async (code) => {
 *       await i18n.changeLanguage(code)
 *       // Handle URL update, etc.
 *     }
 *   }}
 * />
 */

interface LanguageMenuProps {
  availableLanguages?: {
    code: string
    name: string
    isDraft?: boolean
  }[]
  onLanguageChange?: (languageCode: string) => Promise<void>
}

interface TopbarProps {
  children?: React.ReactNode
  courseId?: string | null
  organizationSlug?: string | null
  currentPagePath?: string
  // Feature toggles
  enableSearch?: boolean
  enableLanguageMenu?: boolean
  enableUserMenu?: boolean
  enableQuickActions?: boolean
  // Menu customization
  userMenuOptions?: MenuOption[]
  quickActionsOptions?: MenuOption[]
  languageMenuProps?: LanguageMenuProps
}

const Topbar: React.FC<TopbarProps> = ({
  children,
  courseId,
  organizationSlug,
  currentPagePath,
  enableSearch = true,
  enableLanguageMenu = true,
  enableUserMenu = true,
  enableQuickActions = true,
  userMenuOptions,
  quickActionsOptions,
  languageMenuProps,
}) => {
  const { t, i18n } = useTranslation()
  const loginStateContext = useContext(LoginStateContext)
  const returnTo = useCurrentPagePathForReturnTo(currentPagePath || "")

  const loginPathWithReturnTo = loginRoute(returnTo, i18n.language)
  const signUpPathWithReturnTo = signUpRoute(returnTo, i18n.language)

  const menuState = useOverlayTriggerState({})

  return (
    <>
      <header
        className={css`
          width: 100%;
          border-bottom: 1px solid var(--tone-border-neutral-13);
          background: var(--tone-bg-neutral-6);
          backdrop-filter: saturate(180%) blur(10px);
          position: relative;
          z-index: 100;
        `}
      >
        <div
          className={css`
            margin: 0 auto;
            max-width: 1280px;
            padding-inline: 1rem;
          `}
        >
          <div
            className={css`
              display: flex;
              align-items: center;
              height: 4rem;
              gap: 8px;
            `}
            aria-label={t("aria-label-top-bar")}
          >
            <Brand />

            {/* Middle: primary navigation slot (visible on md+) */}
            <nav
              aria-label={t("aria-label-primary-navigation")}
              className={css`
                margin-inline-start: 8px;
                min-width: 0;
                flex: 1;
                display: none;
                gap: 8px;
                align-items: center;

                ${respondToOrLarger.md} {
                  display: flex;
                }
              `}
            >
              {children}
            </nav>

            {/* Right cluster: account THEN quick actions (hamburger is rightmost) */}
            <div
              className={css`
                margin-inline-start: auto;
                display: flex;
                align-items: center;
                gap: 8px;

                ${respondToOrLarger.md} {
                  display: flex;
                }

                @media (max-width: 767px) {
                  display: none;
                }
              `}
            >
              {enableSearch && (
                <SearchButton
                  {...omitUndefined({ courseId })}
                  {...omitUndefined({ organizationSlug })}
                />
              )}

              {enableSearch && enableLanguageMenu && (
                <Separator
                  // oxlint-disable-next-line i18next/no-literal-string
                  orientation="vertical"
                  className={css`
                    height: 24px;
                    background: var(--tone-bg-neutral-56);
                    margin-inline: 0;
                    display: none;
                    ${respondToOrLarger.md} {
                      display: block;
                    }
                  `}
                />
              )}

              {enableLanguageMenu && (
                <LanguageMenu
                  courseId={courseId}
                  currentPageId={currentPagePath}
                  availableLanguages={languageMenuProps?.availableLanguages}
                  onLanguageChange={languageMenuProps?.onLanguageChange}
                />
              )}

              {enableLanguageMenu && loginStateContext.signedIn && enableUserMenu && (
                <Separator
                  // oxlint-disable-next-line i18next/no-literal-string
                  orientation="vertical"
                  className={css`
                    height: 24px;
                    background: var(--tone-bg-neutral-56);
                    margin-inline: 0;
                    display: none;
                    ${respondToOrLarger.md} {
                      display: block;
                    }
                  `}
                />
              )}

              {loginStateContext.signedIn ? (
                <>
                  {enableUserMenu && <UserMenu menuOptions={userMenuOptions} />}

                  {enableUserMenu && enableQuickActions && (
                    <Separator
                      // oxlint-disable-next-line i18next/no-literal-string
                      orientation="vertical"
                      className={css`
                        height: 24px;
                        background: var(--tone-bg-neutral-56);
                        margin-inline: 0;
                        display: none;
                        ${respondToOrLarger.md} {
                          display: block;
                        }
                      `}
                    />
                  )}

                  {enableQuickActions && (
                    <QuickActionsMenu menuOptions={quickActionsOptions} courseId={courseId} />
                  )}
                </>
              ) : (
                <div
                  className={css`
                    display: flex;
                    align-items: center;
                    gap: 8px;
                  `}
                >
                  <a
                    href={signUpPathWithReturnTo}
                    className={css`
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      gap: 8px;
                      padding: 10px 16px;
                      height: 40px;
                      border-radius: 999px;
                      background: var(--tone-bg-neutral-14);
                      border: 1px solid var(--tone-border-neutral-9);
                      cursor: pointer;
                      transition: all 120ms ease;
                      box-shadow: 0 1px 2px var(--tone-shadow-neutral-5);
                      text-decoration: none;
                      color: var(--tone-fg-info-16);
                      font-weight: 500;
                      font-size: 14px;

                      &:hover {
                        background: var(--tone-bg-neutral-27);
                        border-color: var(--tone-border-neutral-24);
                        box-shadow: 0 2px 4px var(--tone-shadow-neutral-8);
                        color: var(--tone-fg-neutral-40);
                      }

                      &:active {
                        background: var(--tone-bg-neutral-54);
                        border-color: var(--tone-border-neutral-34);
                        box-shadow: 0 1px 2px var(--tone-shadow-neutral-13);
                      }

                      &:focus-visible {
                        outline: none;
                        box-shadow: 0 0 0 2px var(--tone-shadow-neutral-32);
                      }
                    `}
                  >
                    {t("create-new-account")}
                  </a>

                  <a
                    href={loginPathWithReturnTo}
                    className={css`
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      gap: 8px;
                      padding: 10px 16px;
                      height: 40px;
                      border-radius: 999px;
                      background: var(--tone-bg-neutral-92);
                      border: 1px solid var(--tone-border-neutral-61);
                      cursor: pointer;
                      transition: all 120ms ease;
                      box-shadow: 0 1px 2px var(--tone-shadow-neutral-5);
                      text-decoration: none;
                      color: var(--color-text-on-accent);
                      font-weight: 500;
                      font-size: 14px;

                      &:hover {
                        background: var(--tone-bg-info-9);
                        border-color: var(--tone-border-info-13);
                        box-shadow: 0 2px 4px var(--tone-shadow-neutral-13);
                      }

                      &:active {
                        background: var(--tone-bg-info-10);
                        border-color: var(--tone-border-info-14);
                        box-shadow: 0 1px 2px var(--tone-shadow-neutral-17);
                      }

                      &:focus-visible {
                        outline: none;
                        box-shadow: 0 0 0 2px var(--tone-shadow-neutral-32);
                      }
                    `}
                  >
                    {t("log-in")}
                  </a>
                </div>
              )}
            </div>

            <MobileMenuButton state={menuState} />

            {/* Theme is the rightmost item and outside the clusters above, so it is there for
                everyone at every width, signed in or not. */}
            <ThemeMenu />
          </div>
        </div>
      </header>
      {menuState.isOpen && (
        <OverlayContainer>
          <MobileMenuOverlay
            state={menuState}
            primaryNavChildren={children}
            onClose={menuState.close}
            enableSearch={enableSearch}
            enableLanguageMenu={enableLanguageMenu}
            enableUserMenu={enableUserMenu}
            enableQuickActions={enableQuickActions}
            {...omitUndefined({ courseId })}
            {...omitUndefined({ currentPagePath })}
            {...omitUndefined({ userMenuOptions })}
            {...omitUndefined({ quickActionsOptions })}
            {...omitUndefined({ languageMenuProps })}
          />
        </OverlayContainer>
      )}
    </>
  )
}

export default Topbar
