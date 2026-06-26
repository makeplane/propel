import { cva, cx, type VariantProps } from "class-variance-authority";

import {
  type FieldControlTone,
  fieldControlSurfaceVariants,
} from "../../internal/field-control-surface";

export type TextAreaTone = FieldControlTone;

// The bordered frame around the textarea leaf. Per the Figma "Text area" spec the border
// style/width, radius, padding, and the focus/error border treatments are "always the same",
// so they live here as static chrome; only the resting treatment (neutral vs the error/danger
// border) is adjustable, exposed as `tone`. Composes the shared field-box chrome so the input
// and textarea frames stay in lockstep.
export const textAreaBoxVariants = cva(
  cx(
    "flex w-full items-stretch gap-1.5 transition-[color,background-color,border-color,box-shadow]",
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-subtle has-[:disabled]:bg-layer-2 has-[:disabled]:ring-0 has-[:disabled]:hover:border-subtle",
    "rounded-lg py-2",
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
    },
  },
);

export const textAreaVariants = cva(
  cx(
    "scrollbar-sm min-w-0 flex-1 overflow-y-auto bg-transparent text-primary outline-none",
    "placeholder:text-placeholder",
    "disabled:cursor-not-allowed disabled:text-disabled",
  ),
  {
    variants: {
      magnitude: {
        sm: "text-12",
        md: "text-13",
        lg: "text-14",
        xl: "text-16",
      },
      surface: {
        field: "px-3",
        embedded: "p-3 leading-snug",
        inline: "leading-tight",
      },
      /** Controls whether the user can resize the textarea. */
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        both: "resize",
      },
    },
    compoundVariants: [
      { surface: "field", magnitude: "sm", class: "min-h-10" },
      { surface: "field", magnitude: "md", class: "min-h-[66px]" },
      { surface: "field", magnitude: "lg", class: "min-h-[84px]" },
      { surface: "field", magnitude: "xl", class: "min-h-[84px]" },
    ],
  },
);

type TextAreaVariantProps = VariantProps<typeof textAreaVariants>;

export type TextAreaMagnitude = NonNullable<TextAreaVariantProps["magnitude"]>;
export type TextAreaSurface = NonNullable<TextAreaVariantProps["surface"]>;
export type TextAreaResize = NonNullable<TextAreaVariantProps["resize"]>;
