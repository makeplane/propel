import { cva, cx, type VariantProps } from "class-variance-authority";

import { controlGroupClass, controlMagnitude } from "../../internal/control-group";
import { controlInputClass } from "../../internal/control-input";
import { type StrictVariantProps } from "../../internal/variant-props";

export const inputVariants = cva(cx(controlInputClass, "flex-1 disabled:opacity-60"), {
  variants: {
    magnitude: {
      md: "text-14",
      lg: "text-14",
      xl: "text-16",
    },
  },
});

type InputVariantConfig = VariantProps<typeof inputVariants>;

export type InputMagnitude = NonNullable<InputVariantConfig["magnitude"]>;

export type InputVariantProps = StrictVariantProps<typeof inputVariants>;

// The bordered group that frames the input + its inline icon slots: the shared field-control
// surface (`focus: within`) + input geometry (rounded-md, px, magnitude py), hover, transition,
// and the descendant-`:disabled` muting (disabled lives on the inner `<input>`). Danger isn't a
// prop — the surface recolors its border off the wrapped control's `data-invalid`.
export const inputGroupVariants = cva(
  cx(controlGroupClass, "w-full items-center gap-1.5 rounded-md px-3"),
  {
    variants: {
      magnitude: { md: controlMagnitude.md, lg: controlMagnitude.lg, xl: controlMagnitude.xl },
    },
  },
);

export type InputGroupVariantProps = StrictVariantProps<typeof inputGroupVariants>;
