import { cva, cx } from "class-variance-authority";

export const selectLabelVariants = cva("text-14 font-medium text-primary");
export const selectTriggerVariants = cva(
  cx(
    "flex h-9 min-w-48 items-center justify-between gap-2 rounded-md border-sm border-subtle bg-layer-2 px-3 text-14 text-primary outline-none",
    "hover:border-subtle-1 hover:bg-layer-2-hover",
    "focus-visible:border-accent-strong focus-visible:ring-2 focus-visible:ring-accent-strong/20",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
);
export const selectIconVariants = cva(
  "flex size-4 items-center justify-center text-icon-secondary",
);
export const selectPositionerVariants = cva("z-50 outline-none");
export const selectPopupVariants = cva(
  cx(
    "max-h-[min(var(--available-height),18rem)] min-w-(--anchor-width) overflow-y-auto rounded-md border-sm border-subtle bg-layer-1 p-1 shadow-overlay-100",
    "origin-(--transform-origin)",
  ),
);
export const selectItemVariants = cva(
  cx(
    "grid min-h-8 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm px-2 text-14 text-primary outline-none",
    "data-highlighted:bg-layer-transparent-hover data-highlighted:text-primary",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
);
export const selectItemIndicatorVariants = cva(
  "flex size-4 items-center justify-center text-icon-accent-primary",
);
