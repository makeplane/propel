import { cva, cx, type VariantProps } from "class-variance-authority";

export type { InputMagnitude } from "../input/variants";

export const fieldRootVariants = cva("flex flex-col gap-1.5");

export const fieldLabelVariants = cva(
  cx("inline-flex items-center gap-0.5", "font-medium text-primary"),
  {
    variants: {
      magnitude: {
        md: "text-13",
        lg: "text-14",
        xl: "text-14",
      },
      inset: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { magnitude: "md", inset: true, class: "pt-[7px]" },
      { magnitude: "lg", inset: true, class: "pt-[9px]" },
      { magnitude: "xl", inset: true, class: "pt-[13px]" },
    ],
  },
);

type FieldLabelVariantProps = VariantProps<typeof fieldLabelVariants>;

export type FieldMagnitude = NonNullable<FieldLabelVariantProps["magnitude"]>;

export const fieldDescriptionVariants = cva("text-tertiary", {
  variants: {
    magnitude: {
      md: "text-12",
      lg: "text-13",
      xl: "text-13",
    },
  },
});

export const fieldErrorVariants = cva("text-danger-primary", {
  variants: {
    magnitude: {
      md: "text-12",
      lg: "text-13",
      xl: "text-13",
    },
  },
});

export const inputFieldRootVariants = cva("flex gap-2", {
  variants: {
    orientation: {
      vertical: "flex-col items-start",
      horizontal: "flex-row items-start",
    },
  },
});

export const inputFieldContentVariants = cva("flex flex-col", {
  variants: {
    orientation: {
      vertical: "w-full gap-1.5",
      horizontal: "min-w-0 flex-1 gap-2",
    },
  },
});

export const inputFieldBoxVariants = cva(
  cx(
    "flex w-full items-center gap-1.5 bg-layer-2 transition-[color,background-color,border-color,box-shadow]",
    "border-sm",
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-subtle has-[:disabled]:bg-layer-2 has-[:disabled]:ring-0 has-[:disabled]:hover:border-subtle",
    "rounded-md px-3",
  ),
  {
    variants: {
      tone: {
        neutral: cx(
          "border-subtle hover:border-subtle-1 hover:bg-layer-2-hover",
          "focus-within:border-accent-strong focus-within:bg-layer-2 focus-within:ring-2 focus-within:ring-accent-strong/20",
          "focus-within:hover:border-accent-strong focus-within:hover:bg-layer-2",
        ),
        danger: "border-danger-strong",
      },
      magnitude: {
        md: "py-1.5",
        lg: "py-2",
        xl: "py-3",
      },
    },
  },
);

type InputFieldBoxVariantProps = VariantProps<typeof inputFieldBoxVariants>;

export type InputTone = NonNullable<InputFieldBoxVariantProps["tone"]>;

export const textAreaFieldBoxVariants = cva(
  cx(
    "flex w-full items-center gap-1.5 bg-layer-2 transition-[color,background-color,border-color,box-shadow]",
    "border-sm",
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-subtle has-[:disabled]:bg-layer-2 has-[:disabled]:ring-0 has-[:disabled]:hover:border-subtle",
    "items-stretch rounded-lg py-2",
  ),
  {
    variants: {
      tone: {
        neutral: cx(
          "border-subtle hover:border-subtle-1 hover:bg-layer-2-hover",
          "focus-within:border-accent-strong focus-within:bg-layer-2 focus-within:ring-2 focus-within:ring-accent-strong/20",
          "focus-within:hover:border-accent-strong focus-within:hover:bg-layer-2",
        ),
        danger: "border-danger-strong",
      },
    },
  },
);

export const iconSlotVariants = cva(
  cx("flex shrink-0 items-center justify-center text-icon-secondary", "[&_svg]:size-4"),
);

export const fieldItemVariants = cva(
  cx(
    "flex min-w-0 items-start gap-2 rounded-sm px-2 py-1 text-primary transition-colors",
    "data-disabled:cursor-not-allowed data-disabled:opacity-60",
    "not-data-disabled:hover:bg-layer-transparent-hover",
  ),
);

export const labelGroupVariants = cva("flex flex-col gap-1", {
  variants: {
    orientation: {
      vertical: "w-full",
      horizontal: "min-w-0 flex-1",
    },
  },
});
