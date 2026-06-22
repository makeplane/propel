import { cva } from "class-variance-authority";

export const progressIndicatorVariants = cva(
  "absolute inset-y-0 rounded-full bg-accent-primary transition-[width] duration-300 ease-out",
);
export const progressLabelVariants = cva("text-13 font-medium text-secondary");
export const progressValueVariants = cva("text-12 font-medium text-accent-primary tabular-nums");

export const rootVariants = cva("", {
  variants: {
    layout: {
      linear: "flex w-full items-center gap-2",
    },
  },
});

export const trackVariants = cva(
  "relative min-w-0 flex-1 overflow-hidden rounded-full bg-layer-3-selected",
  {
    variants: {
      magnitude: {
        sm: "h-[5px]",
        md: "h-2",
      },
    },
  },
);

export const ringVariants = cva("shrink-0", {
  variants: {
    magnitude: {
      sm: "size-4",
      md: "size-5",
    },
  },
});
