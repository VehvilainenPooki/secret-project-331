import { css, cx } from "@emotion/css"

import { dividedListCss, sectionHeaderCss } from "@/components/credit-registration/styles"

/**
 * The shell every block on the study record shares: a tinted title band over a white body, lifted
 * just off the page. On a hairline border alone, a column of these read as one continuous list.
 */
export const studiesCardCss = css`
  display: grid;
  border: 1px solid var(--tone-border-neutral-31);
  border-radius: var(--surface-radius);
  background: var(--color-surface);
  box-shadow:
    0 1px 2px var(--tone-shadow-info-2),
    0 2px 6px var(--tone-shadow-info-4);
  /* Clips the title band's tint to the rounded corners. */
  overflow: hidden;
`

/** The title band. The tint is what makes it a header rather than the card's first row. */
export const studiesCardHeaderCss = cx(
  sectionHeaderCss,
  css`
    padding: var(--space-4);
    border-bottom: 1px solid var(--tone-border-accent-2);
    background: var(--tone-bg-accent-3);
  `,
)

export const studiesCardBodyCss = css`
  padding: var(--space-4);
`

/**
 * Rows under a title band, ruled apart. The gap between two rows has to beat the gaps inside one,
 * or a card of three rows reads as nine lines of equal weight.
 */
export const studiesCardListCss = cx(
  dividedListCss,
  css`
    > li {
      min-width: 0;
      padding-block: var(--space-3-5);
    }

    > li:last-of-type {
      padding-bottom: 0;
    }
  `,
)
