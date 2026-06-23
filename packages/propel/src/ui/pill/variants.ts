import { cva } from "class-variance-authority";

// "Always the same" per Figma design spec (issue #142):
// - Pill-shaped border-radius (fully rounded ends)
// - Inline-flex layout with centered content
// - Height, horizontal padding, font size per size step
// - Font weight
// - Single-line text (no wrapping)
// - Hover/press/disabled/loading visual treatment

// Shared structural base baked into all pill cva below.
const pillBase =
  "inline-flex shrink-0 items-center justify-center rounded-full border-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-strong";

// ─── Label pill (PillButton) ─────────────────────────────────────────────────

export const pillButtonVariants = cva(
  [
    pillBase,
    "max-w-[120px] gap-1 py-1 [--node-size:0.875rem]",
    "cursor-pointer border-subtle-1 bg-layer-2 text-secondary",
    "hover:border-strong hover:bg-layer-2-hover",
    "active:border-strong active:bg-layer-2-active active:text-primary",
    "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-disabled",
    "aria-busy:cursor-default aria-busy:border-subtle-1 aria-busy:bg-layer-transparent aria-busy:text-disabled",
  ],
  {
    variants: {
      magnitude: {
        sm: "h-5 px-1.5 text-12",
        md: "h-6 px-1.5 text-13",
        lg: "h-7 px-2 text-body-sm-regular",
      },
    },
  },
);

// ─── Label pill (PillSwitch) ─────────────────────────────────────────────────

export const pillSwitchVariants = cva(
  [
    pillBase,
    "max-w-[120px] gap-1 py-1 [--node-size:0.875rem]",
    "cursor-pointer border-subtle-1 bg-layer-2 text-secondary",
    "hover:border-strong hover:bg-layer-2-hover",
    "data-pressed:border-strong data-pressed:bg-layer-2-selected data-pressed:text-primary",
    "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-disabled",
  ],
  {
    variants: {
      magnitude: {
        sm: "h-5 px-1.5 text-12",
        md: "h-6 px-1.5 text-13",
        lg: "h-7 px-2 text-body-sm-regular",
      },
    },
  },
);

// ─── Icon pill ───────────────────────────────────────────────────────────────

export const iconPillVariants = cva(
  [
    pillBase,
    "cursor-pointer border-subtle-1 bg-layer-2 text-icon-secondary",
    "hover:border-strong hover:bg-layer-2-hover",
    "active:border-strong active:bg-layer-2-active",
    "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-icon-disabled",
    "aria-busy:cursor-default aria-busy:border-subtle-1 aria-busy:bg-layer-transparent aria-busy:text-icon-disabled",
  ],
  {
    variants: {
      magnitude: {
        sm: "size-5 [--node-size:0.875rem]",
        md: "size-6 [--node-size:1rem]",
        lg: "size-7 [--node-size:1rem]",
      },
    },
  },
);

export type PillMagnitude = NonNullable<Parameters<typeof pillButtonVariants>[0]>["magnitude"];
