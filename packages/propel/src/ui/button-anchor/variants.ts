import { cva, type VariantProps } from "class-variance-authority";

import { buttonGeometryVariants } from "../../internal/button-geometry";
import { composeVariants } from "../../internal/compose-variants";
import { controlChromeVariants } from "../../internal/control-chrome";
import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

/**
 * The full ButtonAnchor className: the shared control chrome composed with the label-button
 * geometry.
 */
export const buttonAnchorVariants = composeVariants(controlChromeVariants, buttonGeometryVariants);

type ButtonAnchorVariantConfig = VariantProps<typeof buttonAnchorVariants>;
export type ButtonAnchorProminence = NonNullable<ButtonAnchorVariantConfig["prominence"]>;
export type ButtonAnchorTone = NonNullable<ButtonAnchorVariantConfig["tone"]>;
export type ButtonAnchorMagnitude = NonNullable<ButtonAnchorVariantConfig["magnitude"]>;
export type ButtonAnchorSizing = NonNullable<ButtonAnchorVariantConfig["sizing"]>;

// No `defaultVariants` today, so every axis is required.
export type ButtonAnchorVariantProps = StrictVariantProps<typeof buttonAnchorVariants>;

// A decorative node beside the label, sized to the anchor's inherited `--node-size`.
export const buttonAnchorIconVariants = cva(nodeSlotClass);

// The button-anchor's text label.
export const buttonAnchorLabelVariants = cva("");
