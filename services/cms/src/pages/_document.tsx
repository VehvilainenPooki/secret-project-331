import { Head, Html, Main, NextScript } from "next/document"

import { themeInitScript } from "@/shared-module/components/styles/themes/preference"

/** Next's default document plus the theme script, which must run before the first paint. */
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
