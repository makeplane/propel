import { cva, cx, type VariantProps } from "class-variance-authority";

import { checkboxBoxVariants } from "../../internal/checkbox-box";
import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

// The box look lives in `internal/checkbox-box` so it can be shared with the menu's checkbox
// indicator (rule 4). `Checkbox` renders it directly — same signature, so delegate to it.
export const checkboxVariants = checkboxBoxVariants;

type CheckboxVariantConfig = VariantProps<typeof checkboxVariants>;

export type CheckboxTone = NonNullable<CheckboxVariantConfig["tone"]>;

export type CheckboxVariantProps = StrictVariantProps<typeof checkboxVariants>;

// The indicator wrapper centers its content (the glyph) inside the box and sizes
// that single child to the box's `--node-size` (the node-slot pattern), so the glyph
// never bakes its own size. No adjustable axes on the indicator itself.
export const checkboxIndicatorVariants = cva(cx(nodeSlotClass, "text-current"));

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
