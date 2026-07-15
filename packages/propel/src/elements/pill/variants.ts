import { cva, cx, type VariantProps } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

// "Always the same" per Figma design spec (issue #142):
// - Medium (md) border-radius
// - Inline-flex layout with centered content
// - Height, horizontal padding, font size per size step
// - Font weight
// - Single-line text (no wrapping)
// - Hover/press/disabled/loading visual treatment
// - Leading/trailing node position (inline-start / inline-end), sized per size step
//
// "Depends (adjustable)" → props: label (children), leading/trailing node, magnitude,
// emphasis (PillButton outline|soft), selected/unselected (PillSwitch pressed state), disabled,
// and which interactive part (PillButton vs PillSwitch vs IconPill). magnitude/emphasis have no
// sensible default on elements, so they are required — no cva `defaultVariants`.

// Shared structural base baked into every pill container cva below.
const pillBase =
  "inline-flex shrink-0 items-center justify-center rounded-md border-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-strong";

// Shared label-pill base (PillButton + PillSwitch): a 14px node scale, capped width, and
// per-magnitude height/padding/font.
const labelPillBase = cx(pillBase, "max-w-[120px] gap-1 py-1 [--node-size:0.875rem]");

const labelPillMagnitude = {
  sm: "h-5 px-1.5 text-12",
  md: "h-6 px-1.5 text-13",
  lg: "h-7 px-2 text-body-sm-regular",
} as const;

// ─── Containers (one styled element each) ────────────────────────────────────

export const pillButtonVariants = cva([labelPillBase, "cursor-pointer text-secondary"], {
  variants: {
    magnitude: labelPillMagnitude,
    // Figma PillButton mirrors Button prominence chrome (control-chrome):
    // `outline` ≈ secondary (bordered + layer-2), `soft` ≈ tertiary (borderless + layer-3).
    // Disabled/loading stay transparent per the pill Figma (not button's layer-disabled fill).
    emphasis: {
      outline: [
        "border-subtle-1 bg-layer-2",
        "hover:border-strong hover:bg-layer-2-hover",
        "active:border-strong active:bg-layer-2-active active:text-primary",
        "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-disabled",
        "aria-busy:cursor-default aria-busy:border-subtle-1 aria-busy:bg-layer-transparent aria-busy:text-disabled",
      ],
      soft: [
        "border-transparent bg-layer-3",
        "hover:bg-layer-3-hover",
        "active:bg-layer-3-active active:text-primary",
        "disabled:cursor-not-allowed disabled:bg-layer-transparent disabled:text-disabled",
        "aria-busy:cursor-default aria-busy:bg-layer-transparent aria-busy:text-disabled",
      ],
    },
  },
});

// No `defaultVariants` today, so every axis is required.
export type PillButtonVariantProps = StrictVariantProps<typeof pillButtonVariants>;
type PillButtonVariantConfig = VariantProps<typeof pillButtonVariants>;
export type PillButtonEmphasis = NonNullable<PillButtonVariantConfig["emphasis"]>;

export const pillSwitchVariants = cva(
  [
    labelPillBase,
    "cursor-pointer border-subtle-1 bg-layer-2 text-secondary",
    "hover:border-strong hover:bg-layer-2-hover",
    "data-pressed:border-strong data-pressed:bg-layer-2-selected data-pressed:text-primary",
    "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-disabled",
  ],
  {
    variants: { magnitude: labelPillMagnitude },
  },
);

// No `defaultVariants` today, so every axis is required.
export type PillSwitchVariantProps = StrictVariantProps<typeof pillSwitchVariants>;

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

// No `defaultVariants` today, so every axis is required.
export type IconPillVariantProps = StrictVariantProps<typeof iconPillVariants>;

// ─── Inline parts (one element each) ─────────────────────────────────────────

// The single-line label inside a label pill. `min-w-0` lets it shrink and `truncate`
// keeps it on one line per the Figma spec.
export const pillLabelVariants = cva("min-w-0 truncate");

export type PillMagnitude = NonNullable<
  NonNullable<Parameters<typeof pillButtonVariants>[0]>["magnitude"]
>;
