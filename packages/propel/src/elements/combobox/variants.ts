import { cva, cx } from "class-variance-authority";

import { fieldControlSurfaceVariants } from "../../internal/field-control-surface";

export const comboboxLabelVariants = cva("text-14 font-medium text-primary");
export const comboboxInputGroupVariants = cva(
  cx(
    // Wraps a separate focusable input → `focus: within`.
    fieldControlSurfaceVariants({ focus: "within" }),
    "flex min-h-9 min-w-64 items-center gap-2 rounded-md px-3",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
);
export const comboboxInputVariants = cva(
  "min-w-0 flex-1 bg-transparent text-14 text-primary outline-none placeholder:text-placeholder disabled:text-disabled",
);
export const comboboxItemIndicatorVariants = cva(
  cx("flex size-4 items-center justify-center not-data-selected:invisible [&>svg]:size-4"),
);
export const comboboxEmptyVariants = cva("px-2 py-1.5 text-13 text-tertiary");
