import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

// "Always the same" per Figma design spec (issue #142):
// - Pill-shaped border-radius (fully rounded ends)
// - Inline-flex layout with centered content
// - Height, horizontal padding, font size per size step
// - Font weight
// - Single-line text (no wrapping)
// - Hover/press/disabled/loading visual treatment
// - Leading/trailing node position (inline-start / inline-end), sized per size step
//
// "Depends (adjustable)" → props: label (children), leading/trailing node, magnitude,
// selected/unselected (PillSwitch pressed state), disabled, and which interactive part
// (PillButton vs PillSwitch vs IconPill). magnitude has no sensible default, so it is a
// required prop on every container part — no cva `defaultVariants`.

// Shared structural base baked into every pill container cva below.
const pillBase =
  "inline-flex shrink-0 items-center justify-center rounded-full border-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-strong";

// Shared label-pill base (PillButton + PillSwitch): a 14px node scale, capped width, and
// per-magnitude height/padding/font.
const labelPillBase = cx(pillBase, "max-w-[120px] gap-1 py-1 [--node-size:0.875rem]");

const labelPillMagnitude = {
  sm: "h-5 px-1.5 text-12",
  md: "h-6 px-1.5 text-13",
  lg: "h-7 px-2 text-body-sm-regular",
} as const;

// ─── Containers (one styled element each) ────────────────────────────────────

export const pillButtonVariants = cva(
  [
    labelPillBase,
    "cursor-pointer border-subtle-1 bg-layer-2 text-secondary",
    "hover:border-strong hover:bg-layer-2-hover",
    "active:border-strong active:bg-layer-2-active active:text-primary",
    "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-disabled",
    "aria-busy:cursor-default aria-busy:border-subtle-1 aria-busy:bg-layer-transparent aria-busy:text-disabled",
  ],
  {
    variants: { magnitude: labelPillMagnitude },
  },
);

// No `defaultVariants` today, so every axis is required.
export type PillButtonVariantProps = StrictVariantProps<typeof pillButtonVariants>;

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

// A decorative leading/trailing node slot (the Figma inline-start / inline-end node).
// Sizes whatever single child is passed to the pill's inherited `--node-size`; the tint
// comes from the container's text color, so no color is baked here.
export const pillIconVariants = cva(nodeSlotClass);

// The busy spinner slot that replaces a node while a pill is loading. A node-slot: it
// sizes and spins its single svg child to the pill's `--node-size`; tinted by the
// container text color. Bakes no glyph — the ready-made pills pass a `LoaderCircle`.
export const pillSpinnerVariants = cva(cx(nodeSlotClass, "animate-spin"));

export type PillMagnitude = NonNullable<
  NonNullable<Parameters<typeof pillButtonVariants>[0]>["magnitude"]
>;
