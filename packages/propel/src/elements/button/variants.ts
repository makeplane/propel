import { cva, type VariantProps } from "class-variance-authority";

import { buttonGeometryVariants } from "../../internal/button-geometry";
import { composeVariants } from "../../internal/compose-variants";
import { controlChromeVariants } from "../../internal/control-chrome";
import { type StrictVariantProps } from "../../internal/variant-props";

/** The full Button className: the shared control chrome composed with the label-button geometry. */
export const buttonVariants = composeVariants(controlChromeVariants, buttonGeometryVariants);

type ButtonVariantConfig = VariantProps<typeof buttonVariants>;
export type ButtonProminence = NonNullable<ButtonVariantConfig["prominence"]>;
export type ButtonTone = NonNullable<ButtonVariantConfig["tone"]>;
export type ButtonMagnitude = NonNullable<ButtonVariantConfig["magnitude"]>;
export type ButtonSizing = NonNullable<ButtonVariantConfig["sizing"]>;

// No `defaultVariants` today, so every axis is required.
export type ButtonVariantProps = StrictVariantProps<typeof buttonVariants>;

// The text label inside a Button. When the parent button is `aria-busy` (loading) it dims via the
// `group-aria-busy:` sibling of the `group` class on the root.
export const buttonLabelVariants = cva(
  "transition-opacity duration-200 ease-out group-aria-busy:opacity-50",
);
