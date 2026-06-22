import { cva, cx } from "class-variance-authority";

export const sliderVariants = cva("grid w-full grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2");
export const sliderValueVariants = cva("text-13 text-secondary");
export const sliderControlVariants = cva("col-span-2 flex h-5 items-center");
export const sliderTrackVariants = cva("relative h-1 w-full rounded-full bg-layer-3");
export const sliderIndicatorVariants = cva("absolute h-full rounded-full bg-accent-primary");
export const sliderThumbVariants = cva(
  cx(
    "block size-4 rounded-full border-sm border-accent-strong bg-layer-1 shadow-raised-100 outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2",
    "data-disabled:cursor-not-allowed data-disabled:opacity-60",
  ),
);
export const sliderLabelVariants = cva("text-14 font-medium text-primary");
