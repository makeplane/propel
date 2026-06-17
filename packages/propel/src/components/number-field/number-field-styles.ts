import { cva, cx } from "class-variance-authority";

export const numberFieldRootVariants = cva("flex min-w-0 flex-col gap-1.5");
export const numberFieldGroupVariants = cva(
  cx(
    "flex w-fit items-center overflow-hidden rounded-md border-sm border-subtle bg-layer-2",
    "focus-within:border-accent-strong focus-within:ring-2 focus-within:ring-accent-strong/20",
    "data-disabled:cursor-not-allowed data-disabled:border-subtle data-disabled:bg-layer-2",
  ),
);
export const numberFieldButtonVariants = cva(
  cx(
    "flex size-8 items-center justify-center text-icon-secondary transition-colors outline-none",
    "hover:bg-layer-transparent-hover focus-visible:bg-layer-transparent-hover",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
);
export const numberFieldInputVariants = cva(
  "h-8 w-16 bg-transparent text-center text-14 text-primary outline-none disabled:text-disabled",
);
