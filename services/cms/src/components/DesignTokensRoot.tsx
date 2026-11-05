"use client"

import { useThemePreference } from "@/shared-module/components/styles/themes/preference"
import { tokensGlobal } from "@/shared-module/components/styles/tokens"

void tokensGlobal

/** Injects shared design-system CSS variables (`:root`) for TextField and other `@/shared-module/components` controls. */
export default function DesignTokensRoot() {
  // Keeps <html> on the user's theme when the preference or the system setting changes.
  useThemePreference()
  return null
}
