import { cva, cx, type VariantProps } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

/**
 * The icon button box. Owns its own chrome — it does not depend on `Button`. The neutral/danger
 * fill + border + text palette per Figma "Icon button" Type (Primary/Secondary/Tertiary/Ghost;
 * there is no link icon button), plus icon-button geometry: a square `size-N` box per Figma's "Icon
 * button" Size scale (S/Base/L/XL = 20/24/28/32px → sm/md/lg/xl), each magnitude setting
 * `--node-size` (14/16/16/20px) for the glyph slot and spinner.
 */
export const iconButtonVariants = cva(
  cx(
    "group relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md",
    "transition-colors outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
    "aria-busy:cursor-default",
  ),
  {
    variants: {
      // Figma "Icon button" Type. No `link` — there is no link icon button.
      variant: {
        primary: "",
        secondary: "shadow-raised-100",
        tertiary: "",
        ghost: "",
      },
      // Neutral by default; `danger` swaps in the Figma "Error" palette.
      tone: {
        neutral: "",
        danger: "",
      },
      // Square box + glyph scale per magnitude.
      magnitude: {
        sm: "size-5 [--node-size:0.875rem]", // 20px box, 14px glyph
        md: "size-6 [--node-size:1rem]", // 24px box, 16px glyph
        lg: "size-7 [--node-size:1rem]", // 28px box, 16px glyph
        xl: "size-8 [--node-size:1.25rem]", // 32px box, 20px glyph
      },
    },
    compoundVariants: [
      // ----- Neutral solid (Primary) -----
      {
        variant: "primary",
        tone: "neutral",
        className: cx(
          "bg-accent-primary text-inverse",
          "hover:bg-accent-primary-hover active:bg-accent-primary-active",
          "disabled:bg-layer-disabled disabled:text-on-color-disabled",
        ),
      },
      // ----- Neutral outline (Secondary) -----
      {
        variant: "secondary",
        tone: "neutral",
        className: cx(
          "border border-strong bg-layer-2 text-secondary",
          "hover:bg-layer-2-hover active:bg-layer-2-active",
          "disabled:border-disabled disabled:bg-layer-disabled disabled:text-disabled disabled:shadow-none",
        ),
      },
      // ----- Neutral soft (Tertiary) -----
      {
        variant: "tertiary",
        tone: "neutral",
        className: cx(
          "bg-layer-3 text-secondary",
          "hover:bg-layer-3-hover active:bg-layer-3-active",
          "disabled:bg-layer-disabled disabled:text-disabled",
        ),
      },
      // ----- Neutral ghost (Ghost) -----
      {
        variant: "ghost",
        tone: "neutral",
        className: cx(
          "bg-layer-transparent text-secondary",
          "hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
          "disabled:bg-transparent disabled:text-disabled",
        ),
      },
      // ----- Danger solid (Error Fill) -----
      {
        variant: "primary",
        tone: "danger",
        className: cx(
          "bg-danger-primary text-on-color",
          "hover:bg-danger-primary-hover active:bg-danger-primary-active",
          "disabled:bg-layer-disabled disabled:text-on-color-disabled",
        ),
      },
      // ----- Danger outline (Error Outline) -----
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

type IconButtonVariantConfig = VariantProps<typeof iconButtonVariants>;
export type IconButtonVariant = NonNullable<IconButtonVariantConfig["variant"]>;
export type IconButtonTone = NonNullable<IconButtonVariantConfig["tone"]>;
export type IconButtonMagnitude = NonNullable<IconButtonVariantConfig["magnitude"]>;

// No `defaultVariants` today, so every axis is required.
export type IconButtonVariantProps = StrictVariantProps<typeof iconButtonVariants>;

// The icon slot: the button's single glyph. Sizes its one child to the root's inherited
// `--node-size` (via the shared node-slot class). Decorative (the accessible name lives on the
// root's `aria-label`), so the slot is `aria-hidden`.
export const iconButtonIconVariants = cva(nodeSlotClass);

// The loading indicator shown in place of the icon. A single spinning glyph sized to the root's
// `--node-size`. Decorative (the root carries `aria-busy`), so it is `aria-hidden`. A pure slot
// that bakes no glyph — the caller passes the spinner as `children`.
export const iconButtonSpinnerVariants = cva(
  cx(
    "inline-flex shrink-0 items-center justify-center",
    "[&>svg]:size-(--node-size) [&>svg]:animate-spin",
  ),
);
