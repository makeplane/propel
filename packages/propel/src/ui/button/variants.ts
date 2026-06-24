import { cva, cx, type VariantProps } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

// Magnitudes follow the Figma "Buttons" Size scale. Figma ships S/Base/L/XL; those
// map to sm/md/lg/xl by their px heights (20/24/28/32). Per Figma:
// S -> text-12/px-1.5; Base & L -> text-13; XL -> text-14. All chrome'd magnitudes
// use leading-none so the flex-centered label sits dead-center in the fixed height.
export const buttonVariants = cva(
  // Shared chrome: inline flex row, centered, focus-visible ring (with 1px offset)
  // on the brand accent token, real disabled affordance, and a snug medium label.
  // `group` enables `group-aria-busy:` on child elements (e.g. the label span).
  cx(
    "group relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-md font-medium",
    "whitespace-nowrap transition-colors outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    // Disabled: cursor, no pointer events (covers both native disabled and aria-disabled).
    "disabled:pointer-events-none disabled:cursor-not-allowed",
    "aria-busy:cursor-default",
  ),
  {
    variants: {
      // Figma "Type". Primary/secondary/tertiary/ghost are the neutral fills; link
      // is the inline text affordance. The danger palette is selected via `tone`.
      variant: {
        primary: "",
        // No border color here: the border color is owned by the tone compounds
        // below (neutral -> border-strong, danger -> border-danger-strong), because
        // a base color would be order-fragile against the tone color under cx.
        secondary: "shadow-raised-100",
        tertiary: "",
        ghost: "",
        link: "underline underline-offset-2",
      },
      // Neutral by default; `danger` swaps in the Figma "Error" palette.
      tone: {
        neutral: "",
        danger: "",
      },
      // Link-only axis (Figma "Emphasis"). `solid` is the blue `link/primary`
      // affordance; `subtle` is the muted gray inline link. It only changes the
      // appearance of `variant="link"`; every other variant ignores it.
      emphasis: {
        solid: "",
        subtle: "",
      },
      // `leading-none` collapses each label's line box to the glyph height so
      // the flex `items-center` truly centers it inside the fixed-height button;
      // any larger line-height (e.g. `leading-snug`) inflates the line box and
      // makes the top/bottom padding read as uneven. Link overrides below opt
      // back into a taller line-height since inline link text may wrap.
      // Each magnitude also sets `--node-size`, the size every inline-start/end node
      // (icon, avatar, ...) renders at. Per Figma's per-size icon values: 14px up to
      // Base, 16px from L up. The slots and the loading spinner read this variable, so
      // the button owns its node sizing in one place.
      magnitude: {
        sm: "h-5 min-w-10 px-1.5 text-12 leading-none [--node-size:0.875rem]",
        md: "h-6 min-w-10 px-2 text-13 leading-none [--node-size:0.875rem]",
        lg: "h-7 min-w-12 px-2 text-13 leading-none [--node-size:1rem]",
        xl: "h-8 min-w-13 px-2 text-14 leading-none [--node-size:1rem]",
      },
      // Layout axis (Figma "Full width" spec item). `auto` is the default inline
      // size; `full` stretches to fill the container (`w-full`).
      stretch: {
        auto: "",
        full: "w-full",
      },
    },
    compoundVariants: [
      // ----- Neutral solid (Figma Type=Primary) -----
      {
        variant: "primary",
        tone: "neutral",
        className: cx(
          // `text-inverse` (white in light, near-black in dark) keeps AA contrast against
          // the brand-blue surface, which is dark in light themes and light in dark ones.
          "bg-accent-primary text-inverse",
          "hover:bg-accent-primary-hover active:bg-accent-primary-active",
          "disabled:bg-layer-disabled disabled:text-on-color-disabled",
        ),
      },
      // ----- Neutral outline (Figma Type=Secondary) -----
      {
        variant: "secondary",
        tone: "neutral",
        className: cx(
          "border border-strong bg-layer-2 text-secondary",
          "hover:bg-layer-2-hover active:bg-layer-2-active",
          "disabled:border-disabled disabled:bg-layer-disabled disabled:text-disabled disabled:shadow-none",
        ),
      },
      // ----- Neutral soft (Figma Type=Tertiary) -----
      {
        variant: "tertiary",
        tone: "neutral",
        className: cx(
          "bg-layer-3 text-secondary",
          "hover:bg-layer-3-hover active:bg-layer-3-active",
          "disabled:bg-layer-disabled disabled:text-disabled",
        ),
      },
      // ----- Neutral ghost (Figma Type=Ghost) -----
      {
        variant: "ghost",
        tone: "neutral",
        className: cx(
          "bg-layer-transparent text-secondary",
          "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
          "disabled:bg-transparent disabled:text-disabled",
        ),
      },
      // ----- Neutral link, solid (Figma Type=Link, Emphasis=solid) -----
      // The blue `link/primary` affordance.
      {
        variant: "link",
        tone: "neutral",
        emphasis: "solid",
        className: cx(
          "min-w-0 px-0 text-link-primary hover:text-link-primary-hover",
          "disabled:text-disabled disabled:no-underline",
        ),
      },
      // ----- Neutral link, subtle (Figma Type=Link, Emphasis=subtle) -----
      // The muted gray inline link. Uses `text-secondary` (#4e5355) to match
      // Figma and clear AA contrast — NOT the lighter `link-secondary` token.
      {
        variant: "link",
        tone: "neutral",
        emphasis: "subtle",
        className: cx(
          "min-w-0 px-0 text-secondary hover:text-primary",
          "disabled:text-disabled disabled:no-underline",
        ),
      },
      // Link size overrides: link has no chrome/height, so reset to inline text.
      { variant: "link", magnitude: "sm", className: "h-auto leading-snug" },
      { variant: "link", magnitude: "md", className: "h-auto" },
      { variant: "link", magnitude: "lg", className: "h-auto" },
      { variant: "link", magnitude: "xl", className: "h-auto" },
      // ----- Danger solid (Figma Type=Error Fill) -----
      {
        variant: "primary",
        tone: "danger",
        className: cx(
          "bg-danger-primary text-on-color",
          "hover:bg-danger-primary-hover active:bg-danger-primary-active",
          "disabled:bg-layer-disabled disabled:text-on-color-disabled",
        ),
      },
      // ----- Danger outline (Figma Type=Error Outline) -----
      {
        variant: "secondary",
        tone: "danger",
        className: cx(
          "border border-danger-strong bg-layer-2 text-danger-secondary",
          "hover:bg-danger-subtle active:border-danger-subtle active:bg-danger-subtle-active",
          "disabled:border-disabled disabled:bg-layer-disabled disabled:text-disabled disabled:shadow-none",
        ),
      },
    ],
  },
);

type ButtonVariantConfig = VariantProps<typeof buttonVariants>;
export type ButtonVariant = NonNullable<ButtonVariantConfig["variant"]>;
export type ButtonTone = NonNullable<ButtonVariantConfig["tone"]>;
export type ButtonMagnitude = NonNullable<ButtonVariantConfig["magnitude"]>;
export type ButtonEmphasis = NonNullable<ButtonVariantConfig["emphasis"]>;
export type ButtonStretch = NonNullable<ButtonVariantConfig["stretch"]>;

// No `defaultVariants` today, so every axis is required. If a default is ever added, pass
// `keyof typeof buttonDefaultVariants` as the second arg and that axis becomes optional.
export type ButtonVariantProps = StrictVariantProps<typeof buttonVariants>;

// The text label inside a Button. When the parent button is `aria-busy` (loading)
// it dims via the `group-aria-busy:` sibling of the `group` class on the root: the
// spinner replaces the inline-start node, and this fades the text alongside it.
export const buttonLabelVariants = cva("group-aria-busy:opacity-50");

// A decorative node beside the label. Reuses the shared node-slot chrome so its
// single child is sized to the button's inherited `--node-size`.
export const buttonIconVariants = cva(nodeSlotClass);

// The loading indicator that replaces the inline-start node while busy. A pure slot:
// reuses the shared node-slot chrome to size its single child to the button's
// `--node-size`, and spins the wrapper (and thus the child) via `animate-spin`.
export const buttonSpinnerVariants = cva(cx(nodeSlotClass, "animate-spin"));
