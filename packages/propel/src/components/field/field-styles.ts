import { cva, cx, type VariantProps } from "class-variance-authority";

export type { InputMagnitude } from "../input/input-styles";

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

const fieldHelperTextVariants = cva("", {
  variants: {
    magnitude: {
      md: "text-12",
      lg: "text-13",
      xl: "text-13",
    },
  },
});

type FieldHelperTextVariantProps = VariantProps<typeof fieldHelperTextVariants>;

type FieldHelperTextVariantsProps = {
  magnitude: NonNullable<FieldHelperTextVariantProps["magnitude"]>;
};

export const fieldDescriptionVariants = ({ magnitude }: FieldHelperTextVariantsProps) =>
  cx("text-tertiary", fieldHelperTextVariants({ magnitude }));

export const fieldErrorVariants = ({ magnitude }: FieldHelperTextVariantsProps) =>
  cx("text-danger-primary", fieldHelperTextVariants({ magnitude }));

export const fieldBoxVariants = cva(
  cx(
    "flex w-full items-center gap-1.5 bg-layer-2 transition-[color,background-color,border-color,box-shadow]",
    "border-sm",
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-subtle has-[:disabled]:bg-layer-2 has-[:disabled]:ring-0 has-[:disabled]:hover:border-subtle",
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

type FieldBoxVariantProps = VariantProps<typeof fieldBoxVariants>;

export type InputTone = NonNullable<FieldBoxVariantProps["tone"]>;

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

const inputFieldBoxFrameVariants = cva("rounded-md px-3", {
  variants: {
    magnitude: {
      md: "py-1.5",
      lg: "py-2",
      xl: "py-3",
    },
  },
});

type InputFieldBoxFrameVariantProps = VariantProps<typeof inputFieldBoxFrameVariants>;

type InputFieldBoxVariantsProps = {
  magnitude: NonNullable<InputFieldBoxFrameVariantProps["magnitude"]>;
  tone: InputTone;
};

export const inputFieldBoxVariants = ({ magnitude, tone }: InputFieldBoxVariantsProps) =>
  cx(fieldBoxVariants({ tone }), inputFieldBoxFrameVariants({ magnitude }));

const textAreaFieldBoxFrameVariants = cva("items-stretch rounded-lg py-2");

type TextAreaFieldBoxVariantsProps = {
  tone: InputTone;
};

export const textAreaFieldBoxVariants = ({ tone }: TextAreaFieldBoxVariantsProps) =>
  cx(fieldBoxVariants({ tone }), textAreaFieldBoxFrameVariants());

export const iconSlotClass = cx(
  "flex shrink-0 items-center justify-center text-icon-secondary",
  "[&_svg]:size-4",
);
