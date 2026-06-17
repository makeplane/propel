import { cva, cx, type VariantProps } from "class-variance-authority";

export const labelVariants = cva("font-medium text-primary", {
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
});

export const helperVariants = cva("", {
  variants: {
    magnitude: {
      md: "text-12",
      lg: "text-13",
      xl: "text-13",
    },
  },
});

export const controlTextVariants = cva("", {
  variants: {
    magnitude: {
      md: "text-14",
      lg: "text-14",
      xl: "text-16",
    },
  },
});

export const textAreaTextVariants = cva("", {
  variants: {
    magnitude: {
      md: "text-13",
      lg: "text-14",
      xl: "text-16",
    },
  },
});

export type InputMagnitude = NonNullable<VariantProps<typeof labelVariants>["magnitude"]>;

export const boxVariants = cva(
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

export type InputTone = NonNullable<VariantProps<typeof boxVariants>["tone"]>;

export const iconSlotClass = cx(
  "flex shrink-0 items-center justify-center text-icon-secondary",
  "[&_svg]:size-4",
);

export const textAreaMinHeight: Record<InputMagnitude, string> = {
  md: "min-h-[66px]",
  lg: "min-h-[84px]",
  xl: "min-h-[84px]",
};
