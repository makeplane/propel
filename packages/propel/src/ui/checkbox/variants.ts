import { cva, cx, type VariantProps } from "class-variance-authority";

import { checkboxBoxVariants } from "../../internal/checkbox-box";
import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

// The box look lives in `internal/checkbox-box` so it can be shared with the menu's checkbox
// indicator (rule 4). `Checkbox` renders it directly — same signature, so delegate to it.
export const checkboxVariants = checkboxBoxVariants;

export type CheckboxVariantProps = StrictVariantProps<typeof checkboxVariants>;

// the CHECK indicator: shown when checked, hidden when indeterminate
export const checkboxIndicatorVariants = cva(
  cx(nodeSlotClass, "text-current", "data-indeterminate:hidden"),
);
// the INDETERMINATE (dash) indicator: a second Checkbox.Indicator that shows ONLY when indeterminate.
// NOTE: do NOT use nodeSlotClass here — its bare `inline-flex` would fight the default `hidden`.
// Spell out the node sizing + center, default hidden, reveal on data-indeterminate:
export const checkboxIndeterminateIndicatorVariants = cva(
  cx(
    "hidden items-center justify-center data-indeterminate:inline-flex [&>img]:size-(--node-size) [&>svg]:size-(--node-size)",
    "text-current",
  ),
);

// The clickable label row that wraps the box + optional icon + label text.
// `disabled` mirrors the `disabled` prop; the cursor and hover background change.
export const checkboxLabelVariants = cva(
  cx(
    "inline-flex items-center gap-2 rounded-sm px-2 py-1",
    "text-13 text-secondary transition-colors",
  ),
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer hover:bg-layer-transparent-hover",
      },
    },
  },
);

type CheckboxLabelVariantProps = VariantProps<typeof checkboxLabelVariants>;

export type CheckboxLabelDisabled = NonNullable<CheckboxLabelVariantProps["disabled"]>;

// The inline-start icon slot between the box and the label text.
export const checkboxInlineStartNodeVariants = cva(
  cx(nodeSlotClass, "text-icon-secondary [--node-size:0.875rem]"),
);
