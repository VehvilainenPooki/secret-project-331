import { injectGlobal } from "@emotion/css"
import { OverlayProvider } from "@react-aria/overlays"
import React, { useEffect } from "react"

import initI18n from "@/shared-module/common/utils/initI18n"
import { themesGlobal } from "@/shared-module/components/styles/themes/global"
import GlobalStyles from "@/shared-module/exercise-react/react/components/GlobalStyles"
import withErrorBoundary from "@/shared-module/exercise-react/react/components/withErrorBoundary"
import useLanguage from "@/shared-module/exercise-react/react/hooks/useLanguage"

// oxlint-disable-next-line typescript/no-unused-expressions
injectGlobal`
html {
  overflow: hidden;
}
`

// Theme colors (roles and tones) as CSS custom properties; this service's GlobalStyles comes
// from exercise-react, which does not load them.
void themesGlobal

const SERVICE_NAME = "quizzes"

const i18n = initI18n(SERVICE_NAME)

interface ClientLayoutWrapperProps {
  children: React.ReactNode
}

function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const language = useLanguage()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.remove()
    }
  }, [])

  useEffect(() => {
    if (!language) {
      return
    }

    console.info(`Setting language to: ${language}`)
    i18n.changeLanguage(language)
    document.documentElement.lang = language
  }, [language])

  return (
    <OverlayProvider>
      <GlobalStyles />
      {children}
    </OverlayProvider>
  )
}

export default withErrorBoundary(ClientLayoutWrapper)
