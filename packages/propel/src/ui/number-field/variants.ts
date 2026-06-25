import { type VariantProps, cva, cx } from "class-variance-authority";

import { fieldControlSurfaceVariants } from "../../internal/field-control-surface";
import { nodeSlotClass } from "../../internal/node-slot";

export const numberFieldRootVariants = cva("flex min-w-0 flex-col gap-1.5");
export const numberFieldGroupVariants = cva(
  cx(
    // Wraps a separate focusable input → `focus: within`.
    fieldControlSurfaceVariants({ tone: "neutral", focus: "within" }),
    "flex w-fit items-center overflow-hidden rounded-md",
    "data-disabled:cursor-not-allowed data-disabled:border-subtle data-disabled:bg-layer-2",
  ),
);

// Button geometry per magnitude. Each magnitude sets a square size and a `--node-size`
// CSS variable that the `NumberFieldButtonIcon` node-slot reads to size the child icon.
// Figma S/Base/L/XL map to sm/md/lg/xl (20/24/28/32 px). The icon runs one step
// smaller than the button (14/16/16/20 px) matching the icon-button glyph scale.
export const numberFieldButtonVariants = cva(
  cx(
    "flex shrink-0 items-center justify-center text-icon-secondary transition-colors outline-none",
    "hover:bg-layer-transparent-hover focus-visible:bg-layer-transparent-hover",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
  {
    variants: {
      magnitude: {
        sm: "size-5 [--node-size:0.875rem]", // 20 px box, 14 px glyph
        md: "size-6 [--node-size:1rem]", // 24 px box, 16 px glyph
        lg: "size-7 [--node-size:1rem]", // 28 px box, 16 px glyph
        xl: "size-8 [--node-size:1.25rem]", // 32 px box, 20 px glyph
      },
    },
  },
);

// The icon slot inside a stepper button. Sizes its single child to the button's
// `--node-size` (inherited from the button element above), so callers pass a bare icon.
export const numberFieldButtonIconVariants = cva(nodeSlotClass);

// Shared magnitude type so all parts stay in sync.
export type NumberFieldMagnitude = NonNullable<
  VariantProps<typeof numberFieldButtonVariants>["magnitude"]
>;

// Input geometry per magnitude. Heights match the button square per magnitude so the
// group container stays flush. The width is fixed to accommodate up to ~4 digits.
export const numberFieldInputVariants = cva(
  "w-14 bg-transparent text-center text-14 text-primary outline-none disabled:text-disabled",
  {
    variants: {
      magnitude: {
        sm: "h-5",
        md: "h-6",
        lg: "h-7",
        xl: "h-8",
      },
    },
  },
);
