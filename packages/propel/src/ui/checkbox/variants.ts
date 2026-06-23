import { cva, cx, type VariantProps } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";

export const checkboxVariants = cva(
  cx(
    "inline-flex size-4 shrink-0 items-center justify-center rounded-sm border-sm align-top",
    "transition-colors outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    "data-checked:border-transparent data-checked:bg-accent-primary data-checked:text-icon-on-color",
    "data-indeterminate:border-transparent data-indeterminate:bg-accent-primary data-indeterminate:text-icon-on-color",
    "data-disabled:cursor-not-allowed data-disabled:border-disabled data-disabled:bg-transparent",
    "data-disabled:data-checked:border-transparent data-disabled:data-checked:bg-layer-disabled data-disabled:data-checked:text-icon-disabled",
    "data-disabled:data-indeterminate:border-transparent data-disabled:data-indeterminate:bg-layer-disabled data-disabled:data-indeterminate:text-icon-disabled",
  ),
  {
    variants: {
      tone: {
        neutral: "border-icon-tertiary",
        danger: "border-danger-strong",
      },
    },
  },
);

type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;

export type CheckboxTone = NonNullable<CheckboxVariantProps["tone"]>;

// The indicator wrapper centers its content (the glyph) inside the box. Styling
// is baked in — there are no adjustable axes on the indicator itself.
export const checkboxIndicatorVariants = cva("flex items-center justify-center");

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

// The inline-start icon slot between the box and the label text.
export const checkboxInlineStartNodeVariants = cva(
  cx(nodeSlotClass, "text-icon-secondary [--node-size:0.875rem]"),
);
