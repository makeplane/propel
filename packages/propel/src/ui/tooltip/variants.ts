import { cva } from "class-variance-authority";

export const tooltipPositionerVariants = cva("z-50 outline-none");
export const tooltipPopupVariants = cva(
  "flex items-center gap-3 rounded-md border-sm border-subtle-1 bg-layer-2 px-2 py-1.5 text-caption-md-regular text-primary shadow-overlay-200",
);
export const tooltipViewportVariants = cva("relative");
