import { cva, cx } from "class-variance-authority";

import { checkboxBoxVariants } from "../../internal/checkbox-box";
import { nodeSlotClass } from "../../internal/node-slot";

// The box look lives in `internal/checkbox-box` so it can be shared with the menu's checkbox
// indicator (rule 4). `Checkbox` renders it directly — same signature, so delegate to it.
export const checkboxVariants = checkboxBoxVariants;

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

// The clickable label row that wraps the box + optional icon + label text. The row reads its
// disabled state off the wrapped `Checkbox` (Base UI — and `Field.Root` — set `data-disabled` on
// it) via `:has()`, so it needs no `disabled` prop: it cancels the hover background and shows the
// not-allowed cursor whenever a descendant is disabled.
export const checkboxLabelVariants = cva(
  cx(
    "inline-flex items-center gap-2 rounded-sm px-2 py-1",
    "text-13 text-secondary transition-colors",
    "cursor-pointer not-has-[[data-disabled]]:hover:bg-layer-transparent-hover has-[[data-disabled]]:cursor-not-allowed",
  ),
);

// The inline-start icon slot between the box and the label text.
export const checkboxIconVariants = cva(
  cx(nodeSlotClass, "text-icon-secondary [--node-size:0.875rem]"),
);
