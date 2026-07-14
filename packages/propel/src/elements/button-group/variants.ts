import { cva, cx, type VariantProps } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

// ButtonGroup is a connected/segmented container around `ButtonGroupButton`s (Figma "Button
// Group"). The container owns the whole group chrome — the raised white surface, outer border,
// radius, and the dividers between items — so the items themselves stay transparent and
// borderless. Corners of the first/last items are masked by `overflow-hidden`, no child-selector
// overrides needed.
export const buttonGroupVariants = cva(
  cx(
    "isolate inline-flex items-center overflow-hidden rounded-md",
    "border border-strong bg-layer-2 shadow-raised-100",
    "divide-x divide-strong",
  ),
);

// A ButtonGroupButton is one segment of a ButtonGroup: a transparent, borderless action button
// (Figma's grouped "Buttons" — NOT the standalone secondary `Button`: it has no border/shadow/
// radius of its own, tighter padding, and no `xl` step). The focus ring is inset so it isn't
// clipped by the container's `overflow-hidden`. Each magnitude sets `--node-size` so icon slots
// size their glyph to match.
export const buttonGroupButtonVariants = cva(
  cx(
    "group inline-flex shrink-0 cursor-pointer items-center justify-center gap-1",
    "bg-layer-transparent font-medium whitespace-nowrap text-secondary",
    "transition-colors duration-200 ease-out outline-none",
    "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-inset",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-disabled",
  ),
  {
    variants: {
      magnitude: {
        sm: "h-5 px-1.5 text-12 leading-none [--node-size:0.875rem]",
        md: "h-6 px-1.5 text-13 leading-none [--node-size:0.875rem]",
        lg: "h-7 px-2 text-13 leading-none [--node-size:1rem]",
      },
    },
  },
);

type ButtonGroupButtonVariantConfig = VariantProps<typeof buttonGroupButtonVariants>;
export type ButtonGroupButtonMagnitude = NonNullable<ButtonGroupButtonVariantConfig["magnitude"]>;

// No `defaultVariants` today, so every axis is required.
export type ButtonGroupButtonVariantProps = StrictVariantProps<typeof buttonGroupButtonVariants>;
