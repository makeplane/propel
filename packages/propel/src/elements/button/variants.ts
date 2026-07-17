import { cva, type VariantProps } from "class-variance-authority";

import { buttonGeometryVariants } from "../../internal/button-geometry";
import { composeVariants } from "../../internal/compose-variants";
import { type ControlChromePair, controlChromeVariants } from "../../internal/control-chrome";
import { type StrictVariantProps } from "../../internal/variant-props";

/** The full Button className: the shared control chrome composed with the label-button geometry. */
export const buttonVariants = composeVariants(controlChromeVariants, buttonGeometryVariants);

type ButtonVariantConfig = VariantProps<typeof buttonVariants>;
export type ButtonProminence = NonNullable<ButtonVariantConfig["prominence"]>;
export type ButtonTone = NonNullable<ButtonVariantConfig["tone"]>;
export type ButtonMagnitude = NonNullable<ButtonVariantConfig["magnitude"]>;
export type ButtonSizing = NonNullable<ButtonVariantConfig["sizing"]>;

// Geometry axes stay required (no defaults); prominence × tone is the closed chrome pair set.
export type ButtonVariantProps = ControlChromePair &
  Pick<StrictVariantProps<typeof buttonVariants>, "magnitude" | "sizing">;

// Anatomy shell only — no label-specific classes today (loading mute lives on the root chrome).
// Keep the cva so a future label token has a home without reshaping the part.
export const buttonLabelVariants = cva("");
