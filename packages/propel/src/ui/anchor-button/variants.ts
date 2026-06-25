import { cva, cx, type VariantProps } from "class-variance-authority";

import { buttonGeometryVariants } from "../../internal/button-geometry";
import { composeVariants } from "../../internal/compose-variants";
import { controlChromeVariants } from "../../internal/control-chrome";
import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

/**
 * The full AnchorButton className: the shared control chrome composed with the label-button
 * geometry.
 */
export const anchorButtonVariants = composeVariants(controlChromeVariants, buttonGeometryVariants);

type AnchorButtonVariantConfig = VariantProps<typeof anchorButtonVariants>;
export type AnchorButtonProminence = NonNullable<AnchorButtonVariantConfig["prominence"]>;
export type AnchorButtonTone = NonNullable<AnchorButtonVariantConfig["tone"]>;
export type AnchorButtonMagnitude = NonNullable<AnchorButtonVariantConfig["magnitude"]>;
export type AnchorButtonSizing = NonNullable<AnchorButtonVariantConfig["sizing"]>;

// No `defaultVariants` today, so every axis is required.
export type AnchorButtonVariantProps = StrictVariantProps<typeof anchorButtonVariants>;

// A decorative node beside the label, sized to the anchor's inherited `--node-size`.
export const anchorButtonIconVariants = cva(nodeSlotClass);

// The anchor-button's text label. It stays at full contrast while a navigation is pending — the link
// is not disabled, the spinner is the pending cue — so it is not dimmed (unlike the disabled Button).
export const anchorButtonLabelVariants = cva("");

// The pending-navigation indicator shown in place of the inline-start node while a navigation is in
// flight. A pure slot that sizes its single child to `--node-size` and spins it. `aria-hidden`.
export const anchorButtonSpinnerVariants = cva(cx(nodeSlotClass, "animate-spin"));
