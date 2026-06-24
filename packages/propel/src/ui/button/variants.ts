import { cva, cx, type VariantProps } from "class-variance-authority";

import { composeVariants } from "../../internal/compose-variants";
import { controlChromeVariants } from "../../internal/control-chrome";
import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

// Button-specific styling, layered on the shared control chrome (`controlChromeVariants` owns the
// behavior base + the neutral/danger fill/border/text palette). This local cva adds the label-row
// extras, the `link` look + its `emphasis` colors, label geometry (height/min-width/padding/text per
// Figma "Buttons" Size), and the full-width `stretch`. `leading-none` collapses each label's line
// box to the glyph height so flex centering is exact; link opts back into a taller line-height.
// Each magnitude sets `--node-size` (the inline-node/spinner size): 14px up to Base, 16px from L.
const buttonLocalVariants = cva(cx("gap-1 font-medium whitespace-nowrap"), {
  variants: {
    // Figma "Type". The chrome variants are color-less here (the palette is in controlChrome); only
    // `link` carries its own look.
    variant: {
      primary: "",
      secondary: "",
      tertiary: "",
      ghost: "",
      link: "underline underline-offset-2",
    },
    tone: { neutral: "", danger: "" },
    // Link-only axis (Figma "Emphasis"); only the `link` compounds below read it.
    emphasis: { solid: "", subtle: "" },
    magnitude: {
      sm: "h-5 min-w-10 px-1.5 text-12 leading-none [--node-size:0.875rem]",
      md: "h-6 min-w-10 px-2 text-13 leading-none [--node-size:0.875rem]",
      lg: "h-7 min-w-12 px-2 text-13 leading-none [--node-size:1rem]",
      xl: "h-8 min-w-13 px-2 text-14 leading-none [--node-size:1rem]",
    },
    stretch: { auto: "", full: "w-full" },
  },
  compoundVariants: [
    // ----- Neutral link, solid (Figma Type=Link, Emphasis=solid) — the blue link/primary look -----
    {
      variant: "link",
      tone: "neutral",
      emphasis: "solid",
      className: cx(
        "min-w-0 px-0 text-link-primary hover:text-link-primary-hover",
        "disabled:text-disabled disabled:no-underline",
      ),
    },
    // ----- Neutral link, subtle (Figma Type=Link, Emphasis=subtle) — the muted gray inline link --
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
  ],
});

/**
 * The full Button className: the shared control chrome composed with Button's local styling. A
 * non-link button gets its palette from `controlChromeVariants`; the `link` variant draws no chrome
 * and is styled entirely by `buttonLocalVariants`.
 */
export const buttonVariants = composeVariants(controlChromeVariants, buttonLocalVariants);

type ButtonVariantConfig = VariantProps<typeof buttonLocalVariants>;
export type ButtonVariant = NonNullable<ButtonVariantConfig["variant"]>;
export type ButtonTone = NonNullable<ButtonVariantConfig["tone"]>;
export type ButtonMagnitude = NonNullable<ButtonVariantConfig["magnitude"]>;
export type ButtonEmphasis = NonNullable<ButtonVariantConfig["emphasis"]>;
export type ButtonStretch = NonNullable<ButtonVariantConfig["stretch"]>;

// No `defaultVariants` today, so every axis is required. If a default is ever added, pass the
// defaulted keys as the second arg to make those axes optional.
export type ButtonVariantProps = StrictVariantProps<typeof buttonVariants>;

// The text label inside a Button. When the parent button is `aria-busy` (loading) it dims via the
// `group-aria-busy:` sibling of the `group` class on the root.
export const buttonLabelVariants = cva("group-aria-busy:opacity-50");

// A decorative node beside the label. Reuses the shared node-slot chrome so its single child is
// sized to the button's inherited `--node-size`.
export const buttonIconVariants = cva(nodeSlotClass);

// The loading indicator that replaces the inline-start node while busy. A pure slot that sizes its
// single child to `--node-size` and spins the wrapper via `animate-spin`.
export const buttonSpinnerVariants = cva(cx(nodeSlotClass, "animate-spin"));
