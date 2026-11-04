import { injectGlobal } from "@emotion/css"

import { themesCss } from "./index"

/**
 * Injects every theme's color roles as custom properties. Loaded by `tokens.ts` and by common's
 * `GlobalStyles`, so apps that use either get the roles; emotion injects it once per page.
 */
export const themesGlobal = injectGlobal`
  ${themesCss()}
`
