import { injectGlobal } from "@emotion/css"

import { DURATION_MS, EASING, LOOP_DURATION_MS } from "./motion"
import { paletteCustomProperties } from "./palette"
import { themesGlobal } from "./themes/global"

// The color roles are injected alongside these tokens.
void themesGlobal

export const tokensGlobal = injectGlobal`
  :root {
    /* sizing */
    --control-gap: var(--space-3);
    --control-radius: var(--radius-2);
    --surface-radius: var(--radius-3);

    --control-height-sm: var(--space-5);
    --control-height-md: var(--space-6);
    --control-height-lg: var(--space-7);

    --control-padding-x-sm: var(--space-3);
    --control-padding-x-md: var(--space-4);
    --control-padding-x-lg: var(--space-5);

    --font-size-sm: var(--font-size-2);
    --font-size-md: var(--font-size-2);
    --font-size-lg: var(--font-size-3);

    /* spacing scale. A new step is inserted as a half step; renumbering would move every caller. */
    --space-0: 0px;
    --space-1: 2px;
    --space-2: 4px;
    --space-3: 8px;
    --space-3-5: 12px;
    --space-4: 16px;
    --space-4-5: 24px;
    --space-5: 32px;
    --space-6: 40px;
    --space-7: 48px;

    /* type scale */
    --font-size-0: 12px;
    --font-size-1: 14px;
    --font-size-2: 16px;
    --font-size-3: 18px;
    --font-size-3-5: 20px;
    --font-size-4: 24px;
    --font-size-5: 32px;

    /* radii — controls sharpen, surfaces soften, the modal is the softest thing on screen */
    --radius-0: 0px;
    --radius-1: 4px;
    --radius-2: 6px;
    --radius-3: 8px;
    --radius-4: 12px;
    --radius-5: 16px;
    --radius-full: 9999px;

    /* elevation — one neutral shadow colour; each step layers a tight contact shadow with a
       wide ambient one. Never brand-tinted: a shadow is a light model, not a colour choice. */
    --shadow-rgb: 10 15 23;

    --elevation-0: none;
    --elevation-1:
      0 1px 2px rgb(var(--shadow-rgb) / 0.06),
      0 1px 3px rgb(var(--shadow-rgb) / 0.1);
    --elevation-2:
      0 2px 4px rgb(var(--shadow-rgb) / 0.06),
      0 4px 10px rgb(var(--shadow-rgb) / 0.1);
    --elevation-3:
      0 4px 8px rgb(var(--shadow-rgb) / 0.07),
      0 12px 24px rgb(var(--shadow-rgb) / 0.14);
    --elevation-4:
      0 8px 16px rgb(var(--shadow-rgb) / 0.08),
      0 24px 48px rgb(var(--shadow-rgb) / 0.18);
    --elevation-inset-pressed: inset 0 2px 4px rgb(var(--shadow-rgb) / 0.1);

    --scrim: rgb(var(--shadow-rgb) / 0.55);

    /* layering — every portalled overlay (dialog, popover, menu, listbox, tooltip) shares
       --layer-overlay; open order is DOM order, so the last-opened overlay paints on top
       without a token per overlay type. */
    --layer-below: -1;
    --layer-base: 0;
    --layer-raised: 1;
    --layer-sticky: 100;
    --layer-overlay: 1000;
    --layer-toast: 1100;

    /* motion — durations and easings live in motion.ts; nothing here moves longer than
       --duration-deliberate, and only the modal layer gets that */
    --duration-instant: ${DURATION_MS.instant}ms;
    --duration-fast: ${DURATION_MS.fast}ms;
    --duration-base: ${DURATION_MS.base}ms;
    --duration-slow: ${DURATION_MS.slow}ms;
    --duration-deliberate: ${DURATION_MS.deliberate}ms;

    --duration-exit: calc(var(--duration-base) * 0.7);
    --duration-exit-slow: calc(var(--duration-slow) * 0.7);
    --duration-exit-deliberate: calc(var(--duration-deliberate) * 0.7);

    --duration-spin: ${LOOP_DURATION_MS.spin}ms;
    --duration-shimmer: ${LOOP_DURATION_MS.shimmer}ms;
    --duration-progress-beam: ${LOOP_DURATION_MS.progressBeam}ms;

    --ease-standard: ${EASING.standard};
    --ease-entrance: ${EASING.entrance};
    --ease-exit: ${EASING.exit};
    --ease-linear: ${EASING.linear};

    /* type families — declared here; the host app loads the actual font files. Every portalled
       surface must set font-family explicitly, since a portal to document.body escapes any
       styling scoped to the host's app container. Values mirror common's typography.ts;
       components cannot import that package directly. */
    --font-sans:
      "Inter Variable", Inter, system-ui, -apple-system, Cantarell, Ubuntu, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-heading:
      Raleway, system-ui, -apple-system, Cantarell, Ubuntu, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-mono:
      "Commit Mono", ui-monospace, "Source Code Pro", "Ubuntu Mono", SFMono-Regular, Menlo, Monaco,
      Consolas, "Liberation Mono", "Courier New", monospace;

    /* focus ring */
    --focus-ring-width: 2px;
    --focus-ring-offset: 2px;
    --focus-ring-offset-color: transparent;
    --focus-ring-color: rgba(31, 105, 100, 0.6);

    /* disabled */
    --btn-disabled-opacity: 0.55;

    /* loading */
    --btn-loading-opacity: 0.8;

    /* pressed */
    --btn-pressed-offset: 2px;
    --btn-pressed-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

    /* transitions */
    --btn-transition: all 0.2s;
    --btn-press-transition: all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1);

    /* palette, generated from palette.ts */
    ${paletteCustomProperties}

    /* link. Blue, not the brand green: a green link is read as a status in a table of statuses,
       and every other link in the app is blue. */
    --link-fg: var(--color-blue-700);
    --link-fg-hover: var(--color-blue-800);

    /* primary */
    --btn-primary-bg: var(--color-green-600);
    --btn-primary-fg: var(--color-primary-100);
    --btn-primary-border: var(--color-green-600);
    --btn-primary-bg-hover: var(--color-primary-100);
    --btn-primary-fg-hover: var(--color-green-700);
    --btn-primary-border-hover: var(--color-primary-100);
    --btn-primary-bg-pressed: var(--color-green-800);
    --btn-primary-shadow-hover: 0 4px 12px rgba(31, 105, 100, 0.15);
    --btn-primary-outline-width: 3px;

    /* secondary */
    --btn-secondary-bg: var(--color-clear-200);
    --btn-secondary-fg: var(--color-gray-700);
    --btn-secondary-border: var(--color-clear-200);
    --btn-secondary-bg-hover: var(--color-gray-700);
    --btn-secondary-fg-hover: var(--color-clear-50);
    --btn-secondary-border-hover: var(--color-gray-700);
    --btn-secondary-bg-pressed: var(--color-clear-400);
    --btn-secondary-shadow-hover: 0 4px 12px rgba(26, 35, 51, 0.15);
    --btn-secondary-outline-width: 3px;

    /* tertiary */
    --btn-tertiary-bg: transparent;
    --btn-tertiary-fg: var(--color-gray-700);
    --btn-tertiary-border: var(--color-clear-400);
    --btn-tertiary-bg-hover: var(--color-gray-700);
    --btn-tertiary-fg-hover: var(--color-primary-100);
    --btn-tertiary-border-hover: var(--color-gray-700);
    --btn-tertiary-bg-pressed: var(--color-clear-300);
    --btn-tertiary-shadow-hover: 0 4px 12px rgba(26, 35, 51, 0.15);
    --btn-tertiary-outline-width: 3px;

    /* icon */
    --btn-icon-bg: transparent;
    --btn-icon-fg: var(--color-gray-700);
    --btn-icon-border: transparent;
    --btn-icon-bg-hover: transparent;
    --btn-icon-fg-hover: var(--color-gray-800);
    --btn-icon-border-hover: transparent;
    --btn-icon-bg-pressed: transparent;
    --btn-icon-fg-pressed: var(--color-gray-900);
    --btn-icon-shadow-hover: none;
    --btn-icon-padding-x-sm: var(--space-3);
    --btn-icon-padding-x-md: calc(var(--space-4) - (var(--space-1) * 2));
    --btn-icon-padding-x-lg: var(--space-4);

    /* danger */
    --btn-danger-bg: var(--color-crimson-700);
    --btn-danger-fg: var(--color-clear-50);
    --btn-danger-border: var(--color-crimson-700);
    --btn-danger-bg-hover: var(--color-crimson-800);
    --btn-danger-bg-pressed: var(--color-crimson-900);

    /* field */
    --field-bg: #ffffff;
    --field-bg-disabled: var(--color-gray-50);
    --field-border-color: var(--color-gray-400);
    --field-border-color-focus: var(--color-green-500);
    --field-border-color-invalid: var(--color-crimson-600);
    --field-text-color: var(--color-gray-800);
    --field-text-color-disabled: var(--color-gray-400);
    --field-label-color: var(--color-gray-500);
    --field-label-color-focus: var(--color-green-600);
    --field-label-color-invalid: var(--color-crimson-700);
    --field-message-color: var(--color-gray-500);
    --field-message-color-invalid: var(--color-crimson-700);
    --field-icon-color: var(--color-gray-400);
    --field-icon-slot-width: 2.5rem;
    --field-transition:
      border-color 160ms ease,
      box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
      padding-top 200ms cubic-bezier(0.2, 0, 0, 1),
      padding-bottom 200ms cubic-bezier(0.2, 0, 0, 1);

    /* compatibility aliases for the broader form component set */
    --field-fg: var(--field-text-color);
    --field-label: var(--field-label-color);
    --field-description: var(--field-message-color);
    --field-placeholder: var(--color-gray-400);
    --field-chrome: var(--field-icon-color);
    --field-border: var(--field-border-color);
    --field-border-focus: var(--field-border-color-focus);
    --field-error: var(--field-message-color-invalid);
    --field-error-border: var(--field-border-color-invalid);
    --field-disabled-bg: var(--field-bg-disabled);
    --field-disabled-fg: var(--field-text-color-disabled);
    --field-disabled-border: var(--field-border-color);
    --field-readonly-bg: var(--color-blue-25);
    --field-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
    --field-notice: var(--color-yellow-900);
    --field-option-highlight: var(--color-blue-50);
    --field-option-selected: var(--color-green-50);

    --switch-track-off: var(--color-clear-800);
    --switch-track-on: var(--color-green-600);

    /* switch-specific */
    --switch-thumb: var(--color-primary-100);
    --switch-focus-ring: rgba(31, 105, 100, 0.18);

    /* query result */
    --query-skeleton-surface-light:
      linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.65)),
      rgba(0, 0, 0, 0.03);
    --query-skeleton-surface-border-light: rgba(0, 0, 0, 0.06);
    --query-skeleton-block-light: rgba(0, 0, 0, 0.05);

    --query-skeleton-surface-dark:
      linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),
      rgba(255, 255, 255, 0.03);
    --query-skeleton-surface-border-dark: rgba(255, 255, 255, 0.07);
    --query-skeleton-block-dark: rgba(255, 255, 255, 0.06);

    --query-shimmer-mid: rgba(255, 255, 255, 0.18);
    --query-shimmer-edge: rgba(255, 255, 255, 0.05);

    --query-progress-track-light: rgba(0, 0, 0, 0.05);
    --query-progress-beam-light: rgba(255, 255, 255, 0.6);
    --query-progress-track-dark: rgba(255, 255, 255, 0.06);
    --query-progress-beam-dark: rgba(255, 255, 255, 0.45);

    --query-refresh-content-opacity: 0.6;
    --query-refresh-blur: 6px;
    --query-refresh-content-scale: 0.992;
    --query-content-transition: 180ms ease;
    --query-border-width: 1px;
    --query-shimmer-duration: 1.6s;
    --query-progress-beam-duration: 1.1s;
  }
`
