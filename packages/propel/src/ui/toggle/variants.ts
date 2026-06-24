import { cva, cx, type VariantProps } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";

// A Toggle is a two-state icon button. The only visual axis is size (`magnitude`);
// pressed/disabled are control state Base UI reflects as `[data-pressed]`/
// `[data-disabled]`. Each magnitude sets `--node-size` so an inner icon sizes itself.
export const toggleVariants = cva(
  cx(
    "inline-flex shrink-0 items-center justify-center rounded-md transition-colors outline-none",
    "cursor-pointer text-icon-secondary",
    "bg-layer-transparent hover:bg-layer-transparent-hover active:bg-layer-transparent-active",
    "data-pressed:bg-layer-transparent-selected data-pressed:text-icon-primary",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
    "data-disabled:cursor-not-allowed data-disabled:opacity-60",
  ),
  {
    variants: {
      magnitude: {
        sm: "size-6 [--node-size:0.875rem]",
        md: "size-7 [--node-size:1rem]",
        lg: "size-8 [--node-size:1rem]",
      },
    },
  },
);

export type ToggleMagnitude = NonNullable<VariantProps<typeof toggleVariants>["magnitude"]>;

// The icon slot inside a `Toggle`. Sizes its single child to the toggle's `--node-size`
// (via the shared node-slot class) so callers pass a bare icon — no sizing class at the
// call site. The toggle's `magnitude` sets `--node-size`, which this inherits.
export const toggleIconVariants = cva(nodeSlotClass);
