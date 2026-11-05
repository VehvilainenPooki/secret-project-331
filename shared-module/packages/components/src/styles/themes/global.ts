import { injectGlobal } from "@emotion/css"

import { themesCss } from "./index"

/**
 * Injects every theme's color roles as custom properties. Loaded by `tokens.ts` and by common's
 * `GlobalStyles`, so apps that use either get the roles; emotion injects it once per page.
 */
export const themesGlobal = injectGlobal`
  ${themesCss()}

  /* When the system asks for more contrast, muted text and soft borders use the active theme's
     full-strength text and border colors. */
  @media (prefers-contrast: more) {
    :root,
    [data-theme] {
      --color-text-muted: var(--color-text);
      --color-text-subtle: var(--color-text);
      --color-border: var(--color-border-strong);
      --color-control-border: var(--color-border-strong);
    }
  }
`
