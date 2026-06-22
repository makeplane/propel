import { cva, cx, type VariantProps } from "class-variance-authority";

export const textAreaVariants = cva(
  cx(
    "scrollbar-sm min-w-0 flex-1 resize-none overflow-y-auto bg-transparent text-primary outline-none",
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
        embedded: "w-full p-3 leading-snug",
        inline: "leading-tight",
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
