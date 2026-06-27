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
export const comboboxButtonVariants = cva(
  "flex size-6 items-center justify-center rounded-sm text-icon-secondary outline-none hover:bg-layer-transparent-hover focus-visible:bg-layer-transparent-hover data-disabled:text-disabled [&>svg]:size-4",
);
export const comboboxItemIndicatorVariants = cva(
  cx("flex size-4 items-center justify-center [&>svg]:size-4"),
);
export const comboboxPositionerVariants = cva("z-50 outline-none");
export const comboboxPopupVariants = cva(
  "max-h-[min(var(--available-height),18rem)] min-w-(--anchor-width) overflow-y-auto rounded-md border-sm border-subtle bg-layer-1 p-1 shadow-overlay-100",
);
export const comboboxItemVariants = cva(
  cx(
    "grid min-h-8 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm px-2 text-14 text-primary outline-none",
    "data-highlighted:bg-layer-transparent-hover data-highlighted:text-primary",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
);
export const comboboxEmptyVariants = cva("px-2 py-1.5 text-13 text-tertiary");
