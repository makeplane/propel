import { cva, cx } from "class-variance-authority";

export const pillBase = cx(
  "inline-flex shrink-0 items-center justify-center rounded-md border-sm outline-none",
  "transition-colors focus-visible:ring-2 focus-visible:ring-accent-strong",
);

export const labelPillSize = cva(cx(pillBase, "max-w-[120px] gap-1 py-1 [--node-size:0.875rem]"), {
  variants: {
    magnitude: {
      sm: "h-5 px-1.5",
      md: "h-6 px-1.5",
      lg: "h-7 px-2",
    },
  },
});

export const iconPillVariants = cva(
  cx(
    pillBase,
    "cursor-pointer border-subtle-1 bg-layer-2 text-icon-secondary",
    "hover:border-strong hover:bg-layer-2-hover",
    "active:border-strong active:bg-layer-2-active",
    "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-icon-disabled",
    "aria-busy:cursor-default aria-busy:border-subtle-1 aria-busy:bg-layer-transparent aria-busy:text-icon-disabled",
  ),
  {
    variants: {
      magnitude: {
        sm: "size-5 [--node-size:0.875rem]",
        md: "size-6 [--node-size:1rem]",
        lg: "size-7 [--node-size:1rem]",
      },
    },
  },
);
