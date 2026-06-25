import { cva, cx, type VariantProps } from "class-variance-authority";

import {
  type FieldControlTone,
  fieldControlSurfaceVariants,
} from "../../internal/field-control-surface";
import { nodeSlotClass } from "../../internal/node-slot";

export const inputVariants = cva(
  cx(
    "min-w-0 flex-1 bg-transparent text-primary outline-none",
    "caret-(--border-color-accent-strong)",
    "placeholder:text-placeholder",
    "disabled:cursor-not-allowed disabled:text-disabled disabled:opacity-60",
  ),
  {
    variants: {
      magnitude: {
        md: "text-14",
        lg: "text-14",
        xl: "text-16",
      },
    },
  },
);

type InputVariantProps = VariantProps<typeof inputVariants>;

export type InputMagnitude = NonNullable<InputVariantProps["magnitude"]>;

/** Resting treatment of the input box (`neutral` / `danger`). */
export type InputTone = FieldControlTone;

// The bordered "box" that frames the input + its inline icon slots: the shared field-control
// surface + input geometry (rounded-md, px, magnitude py), hover, transition, and the
// descendant-`:disabled` muting (disabled lives on the inner `<input>`).
export const inputBoxVariants = cva(
  cx(
    "flex w-full items-center gap-1.5 transition-[color,background-color,border-color,box-shadow]",
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-subtle has-[:disabled]:bg-layer-2 has-[:disabled]:ring-0 has-[:disabled]:hover:border-subtle",
    "rounded-md px-3",
  ),
  {
    variants: {
      tone: {
        neutral: cx(
          fieldControlSurfaceVariants({ tone: "neutral", focus: "within" }),
          "hover:border-subtle-1 hover:bg-layer-2-hover",
          "focus-within:bg-layer-2 focus-within:hover:border-accent-strong focus-within:hover:bg-layer-2",
        ),
        danger: fieldControlSurfaceVariants({ tone: "danger", focus: "none" }),
      },
      magnitude: { md: "py-1.5", lg: "py-2", xl: "py-3" },
    },
  },
);

// The decorative 16px node at the input's inline start/end (sizes its child to `--node-size`).
export const inputIconSlotVariants = cva(
  cx(nodeSlotClass, "text-icon-secondary [--node-size:1rem]"),
);
