import { injectGlobal } from "@emotion/css"

import { DURATION_MS, EASING, LOOP_DURATION_MS } from "./motion"
import { paletteCustomProperties } from "./palette"
import { colors, withAlpha } from "./themes"
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
       wide ambient one. Never brand-tinted: a shadow is a light model, not a colour choice.
       The colour is the theme's shadow role. */
    --elevation-0: none;
    --elevation-1:
      0 1px 2px ${withAlpha(colors.shadow, 6)},
      0 1px 3px ${withAlpha(colors.shadow, 10)};
    --elevation-2:
      0 2px 4px ${withAlpha(colors.shadow, 6)},
      0 4px 10px ${withAlpha(colors.shadow, 10)};
    --elevation-3:
      0 4px 8px ${withAlpha(colors.shadow, 7)},
      0 12px 24px ${withAlpha(colors.shadow, 14)};
    --elevation-4:
      0 8px 16px ${withAlpha(colors.shadow, 8)},
      0 24px 48px ${withAlpha(colors.shadow, 18)};
    --elevation-inset-pressed: inset 0 2px 4px ${withAlpha(colors.shadow, 10)};

    --scrim: var(--color-scrim);

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
    --focus-ring-color: var(--color-focus-ring);

    /* disabled */
    --btn-disabled-opacity: 0.55;

    /* loading */
    --btn-loading-opacity: 0.8;

    /* pressed */
    --btn-pressed-offset: 2px;
    --btn-pressed-shadow: inset 0 2px 4px ${withAlpha(colors.tint, 10)};

    /* transitions */
    --btn-transition: all 0.2s;
    --btn-press-transition: all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1);

    /* palette, generated from palette.ts */
    ${paletteCustomProperties}

    /* link. Blue, not the brand green: a green link is read as a status in a table of statuses,
       and every other link in the app is blue. */
    --link-fg: var(--color-link);
    --link-fg-hover: var(--color-link-hover);

    /* primary */
    --btn-primary-bg: var(--color-accent);
    --btn-primary-fg: var(--color-text-on-accent);
    --btn-primary-border: var(--color-accent);
    --btn-primary-bg-hover: var(--color-surface);
    --btn-primary-fg-hover: var(--color-accent-hover);
    --btn-primary-border-hover: var(--color-surface);
    --btn-primary-bg-pressed: var(--color-accent-pressed);
    --btn-primary-shadow-hover: 0 4px 12px ${withAlpha(colors.accent, 15)};
    --btn-primary-outline-width: 3px;

    /* secondary */
    --btn-secondary-bg: var(--color-control-bg);
    --btn-secondary-fg: var(--color-text);
    --btn-secondary-border: var(--color-control-bg);
    --btn-secondary-bg-hover: var(--color-surface-inverse);
    --btn-secondary-fg-hover: var(--color-text-inverse);
    --btn-secondary-border-hover: var(--color-surface-inverse);
    --btn-secondary-bg-pressed: var(--color-control-bg-pressed);
    --btn-secondary-shadow-hover: 0 4px 12px ${withAlpha(colors.surfaceInverse, 15)};
    --btn-secondary-outline-width: 3px;

    /* tertiary */
    --btn-tertiary-bg: transparent;
    --btn-tertiary-fg: var(--color-text);
    --btn-tertiary-border: var(--color-control-border);
    --btn-tertiary-bg-hover: var(--color-surface-inverse);
    --btn-tertiary-fg-hover: var(--color-text-inverse);
    --btn-tertiary-border-hover: var(--color-surface-inverse);
    --btn-tertiary-bg-pressed: var(--color-control-ghost-bg-pressed);
    --btn-tertiary-shadow-hover: 0 4px 12px ${withAlpha(colors.surfaceInverse, 15)};
    --btn-tertiary-outline-width: 3px;

    /* icon */
    --btn-icon-bg: transparent;
    --btn-icon-fg: var(--color-text);
    --btn-icon-border: transparent;
    --btn-icon-bg-hover: transparent;
    --btn-icon-fg-hover: var(--color-text-strong);
    --btn-icon-border-hover: transparent;
    --btn-icon-bg-pressed: transparent;
    --btn-icon-fg-pressed: var(--color-text-stronger);
    --btn-icon-shadow-hover: none;
    --btn-icon-padding-x-sm: var(--space-3);
    --btn-icon-padding-x-md: calc(var(--space-4) - (var(--space-1) * 2));
    --btn-icon-padding-x-lg: var(--space-4);

    /* danger */
    --btn-danger-bg: var(--color-danger-fill);
    --btn-danger-fg: var(--color-text-on-accent);
    --btn-danger-border: var(--color-danger-fill);
    --btn-danger-bg-hover: var(--color-danger-fill-hover);
    --btn-danger-bg-pressed: var(--color-danger-fill-pressed);

    /* field */
    --field-bg: var(--color-surface);
    --field-bg-disabled: var(--color-surface-disabled);
    --field-border-color: var(--color-border-strong);
    --field-border-color-focus: var(--color-border-focus);
    --field-border-color-invalid: var(--color-danger-border);
    --field-text-color: var(--color-text-strong);
    --field-text-color-disabled: var(--color-text-disabled);
    --field-label-color: var(--color-text-muted);
    --field-label-color-focus: var(--color-accent);
    --field-label-color-invalid: var(--color-danger-text);
    --field-message-color: var(--color-text-muted);
    --field-message-color-invalid: var(--color-danger-text);
    --field-icon-color: var(--color-text-subtle);
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
    --field-placeholder: var(--color-text-subtle);
    --field-chrome: var(--field-icon-color);
    --field-border: var(--field-border-color);
    --field-border-focus: var(--field-border-color-focus);
    --field-error: var(--field-message-color-invalid);
    --field-error-border: var(--field-border-color-invalid);
    --field-disabled-bg: var(--field-bg-disabled);
    --field-disabled-fg: var(--field-text-color-disabled);
    --field-disabled-border: var(--field-border-color);
    --field-readonly-bg: var(--color-surface-readonly);
    --field-shadow: inset 0 1px 0 ${withAlpha(colors.sheen, 70)};
    --field-notice: var(--color-warning-text);
    --field-option-highlight: var(--color-surface-highlight);
    --field-option-selected: var(--color-surface-selected);

    --switch-track-off: var(--color-control-track-off);
    --switch-track-on: var(--color-accent);

    /* switch-specific */
    --switch-thumb: var(--color-control-thumb);
    --switch-focus-ring: ${withAlpha(colors.accent, 18)};

    /* query result. The light set sits on the theme's own surface and follows its tint and sheen
       roles. The dark set is for a dark backdrop placed on the page, which stays dark in every
       theme, so it keeps a fixed white. */
    --query-skeleton-surface-light:
      linear-gradient(180deg, ${withAlpha(colors.sheen, 80)}, ${withAlpha(colors.sheen, 65)}),
      ${withAlpha(colors.tint, 3)};
    --query-skeleton-surface-border-light: ${withAlpha(colors.tint, 6)};
    --query-skeleton-block-light: ${withAlpha(colors.tint, 5)};

    --query-skeleton-surface-dark:
      linear-gradient(180deg, ${withAlpha("var(--color-white)", 4)}, ${withAlpha("var(--color-white)", 2)}),
      ${withAlpha("var(--color-white)", 3)};
    --query-skeleton-surface-border-dark: ${withAlpha("var(--color-white)", 7)};
    --query-skeleton-block-dark: ${withAlpha("var(--color-white)", 6)};

    --query-shimmer-mid: ${withAlpha(colors.sheen, 18)};
    --query-shimmer-edge: ${withAlpha(colors.sheen, 5)};

    --query-progress-track-light: ${withAlpha(colors.tint, 5)};
    --query-progress-beam-light: ${withAlpha(colors.sheen, 60)};
    --query-progress-track-dark: ${withAlpha("var(--color-white)", 6)};
    --query-progress-beam-dark: ${withAlpha("var(--color-white)", 45)};

    --query-refresh-content-opacity: 0.6;
    --query-refresh-blur: 6px;
    --query-refresh-content-scale: 0.992;
    --query-content-transition: 180ms ease;
    --query-border-width: 1px;
    --query-shimmer-duration: 1.6s;
    --query-progress-beam-duration: 1.1s;
  }
`
