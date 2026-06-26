import { cva, cx, type VariantProps } from "class-variance-authority";

import { buttonGeometryVariants } from "../../internal/button-geometry";
import { composeVariants } from "../../internal/compose-variants";
import { controlChromeVariants } from "../../internal/control-chrome";
import { nodeSlotClass } from "../../internal/node-slot";
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
export const buttonLabelVariants = cva("group-aria-busy:opacity-50");

// A decorative node beside the label. Reuses the shared node-slot chrome so its single child is
// sized to the button's inherited `--node-size`.
export const buttonIconVariants = cva(nodeSlotClass);

// The loading indicator that replaces the inline-start node while busy. A pure slot that sizes its
// single child to `--node-size` and spins the wrapper via `animate-spin`.
export const buttonSpinnerVariants = cva(cx(nodeSlotClass, "animate-spin"));
