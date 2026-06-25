import { cva, cx, type VariantProps } from "class-variance-authority";

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

// The button-anchor's text label. It stays at full contrast while a navigation is pending — the link
// is not disabled, the spinner is the pending cue — so it is not dimmed (unlike the disabled Button).
export const buttonAnchorLabelVariants = cva("");

// The pending-navigation indicator shown in place of the inline-start node while a navigation is in
// flight. A pure slot that sizes its single child to `--node-size` and spins it. `aria-hidden`.
export const buttonAnchorSpinnerVariants = cva(cx(nodeSlotClass, "animate-spin"));
