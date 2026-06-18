import { cva, cx } from "class-variance-authority";

export const radioVariants = cva(
  cx(
    "flex size-4 shrink-0 items-center justify-center rounded-full border-sm border-current bg-layer-1",
    "text-icon-tertiary transition-colors outline-none",
    "data-checked:text-icon-accent-primary",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2",
    "data-disabled:cursor-not-allowed data-disabled:text-icon-disabled data-disabled:opacity-60",
  ),
);

// The inner dot: 8px (`size-2`) filled with the Root's `currentColor`, only present while selected
// (Base UI mounts the Indicator when checked).
export const radioIndicatorVariants = cva("size-2 rounded-full bg-current");

export const radioGroupVariants = cva("flex flex-col", {
  variants: {
    density: {
      comfortable: "gap-2",
      compact: "gap-0",
    },
  },
});
