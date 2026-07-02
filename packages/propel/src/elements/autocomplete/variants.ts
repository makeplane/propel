import { cva, cx, type VariantProps } from "class-variance-authority";

import { controlGroupClass, controlMagnitude } from "../../internal/control-group";
import { controlInputClass } from "../../internal/control-input";
import { listboxEmptyClass } from "../../internal/listbox-empty";
import { type StrictVariantProps } from "../../internal/variant-props";

export const autocompleteInputGroupVariants = cva(
  cx(
    // Wraps a separate focusable input → the shared `focus: within` group chrome.
    controlGroupClass,
    "w-full items-center gap-2 rounded-lg px-3",
  ),
  {
    variants: {
      // Height / padding / icon-size per step, matching the Search box (Figma 28/32/36px).
      // `--node-size` sizes the leading icon slot (and any bare node-slot child).
      magnitude: {
        sm: controlMagnitude.sm,
        md: controlMagnitude.md,
        lg: controlMagnitude.lg,
        xl: controlMagnitude.xl,
      },
    },
  },
);

type AutocompleteInputGroupVariantConfig = VariantProps<typeof autocompleteInputGroupVariants>;
export type AutocompleteMagnitude = NonNullable<AutocompleteInputGroupVariantConfig["magnitude"]>;
export type AutocompleteInputGroupVariantProps = StrictVariantProps<
  typeof autocompleteInputGroupVariants
>;

export const autocompleteInputVariants = cva(cx(controlInputClass, "flex-1"), {
  variants: {
    magnitude: { sm: "text-13", md: "text-14", lg: "text-14", xl: "text-16" },
  },
});
export type AutocompleteInputVariantProps = StrictVariantProps<typeof autocompleteInputVariants>;
export const autocompleteEmptyVariants = cva(listboxEmptyClass);
