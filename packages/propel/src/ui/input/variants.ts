import { cva, cx, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  cx(
    "min-w-0 flex-1 bg-transparent text-primary outline-none",
    "placeholder:text-placeholder",
    "disabled:cursor-not-allowed disabled:text-disabled",
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
