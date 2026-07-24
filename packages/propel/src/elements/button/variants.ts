import { cva, type VariantProps } from "class-variance-authority";

import { buttonGeometryVariants } from "../../internal/button-geometry";
import { composeVariants } from "../../internal/compose-variants";
import { controlChromeVariants } from "../../internal/control-chrome";
import { type StrictVariantProps } from "../../internal/variant-props";

/** The full Button className: the shared control chrome composed with the label-button geometry. */
export const buttonVariants = composeVariants(controlChromeVariants, buttonGeometryVariants);

type ButtonVariantConfig = VariantProps<typeof buttonVariants>;
export type ButtonVariant = NonNullable<ButtonVariantConfig["variant"]>;
export type ButtonSize = NonNullable<ButtonVariantConfig["size"]>;
export type ButtonFillType = NonNullable<ButtonVariantConfig["fillType"]>;

// Every axis stays required (no defaults); variant is the closed chrome set.
export type ButtonVariantProps = StrictVariantProps<typeof buttonVariants>;

// Anatomy shell only — no label-specific classes today (loading mute lives on the root chrome).
// Keep the cva so a future label token has a home without reshaping the part.
export const buttonLabelVariants = cva("");
