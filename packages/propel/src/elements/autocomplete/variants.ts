import { cva, cx, type VariantProps } from "class-variance-authority";

import { controlGroupClass } from "../../internal/control-group";
import { controlInputClass } from "../../internal/control-input";
import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

export const autocompleteInputGroupVariants = cva(
  cx(
    // Wraps a separate focusable input → the shared `focus: within` group chrome.
    controlGroupClass,
    "group/autocomplete w-full items-center gap-2 rounded-lg",
  ),
  {
    variants: {
      // Height / padding / icon-size per step, matching the Search box (Figma 28/32/36px).
      // `--node-size` sizes the leading icon slot (and any bare node-slot child).
      magnitude: {
        sm: "min-h-7 px-1.5 [--node-size:0.875rem]",
        md: "min-h-8 px-2 [--node-size:1rem]",
        lg: "min-h-9 px-2.5 [--node-size:1rem]",
      },
    },
  },
);

type AutocompleteInputGroupVariantConfig = VariantProps<typeof autocompleteInputGroupVariants>;
export type AutocompleteMagnitude = NonNullable<AutocompleteInputGroupVariantConfig["magnitude"]>;
export type AutocompleteInputGroupVariantProps = StrictVariantProps<
  typeof autocompleteInputGroupVariants
>;

// The decorative leading icon (e.g. a search magnifier) at the input group's inline-start. Sizes its
// single child to the group's `--node-size` and tints toward the placeholder, brightening on focus.
export const autocompleteIconVariants = cva(
  cx(
    nodeSlotClass,
    "text-icon-placeholder transition-colors group-focus-within/autocomplete:text-icon-secondary",
  ),
);
export const autocompleteInputVariants = cva(cx(controlInputClass, "flex-1"), {
  variants: {
    magnitude: { sm: "text-13", md: "text-14", lg: "text-14" },
  },
});
export type AutocompleteInputVariantProps = StrictVariantProps<typeof autocompleteInputVariants>;
export const autocompleteEmptyVariants = cva("px-2 py-1.5 text-13 text-tertiary");
