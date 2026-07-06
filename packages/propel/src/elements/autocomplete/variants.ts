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
    // A trailing control (clear/trigger renders a `<button>`; the leading icon is a `<span>`) sits
    // flush inside the field, not in its own oversized button well: tighten the group's right
    // padding so the chevron/clear glyph reads as part of the input, optically balanced with the
    // text. The `:has()` selector outweighs the flat `px-3`, so it only applies when present.
    "has-[button]:pr-1",
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
