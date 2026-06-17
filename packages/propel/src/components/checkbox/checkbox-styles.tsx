import { cva, cx, type VariantProps } from "class-variance-authority";

export const checkboxVariants = cva(
  cx(
    "inline-flex size-4 shrink-0 items-center justify-center rounded-sm border-sm align-top",
    "transition-colors outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    "data-checked:border-transparent data-checked:bg-accent-primary data-checked:text-icon-on-color",
    "data-indeterminate:border-transparent data-indeterminate:bg-accent-primary data-indeterminate:text-icon-on-color",
    "data-disabled:cursor-not-allowed data-disabled:border-disabled data-disabled:bg-transparent",
    "data-disabled:data-checked:border-transparent data-disabled:data-checked:bg-layer-disabled data-disabled:data-checked:text-icon-disabled",
    "data-disabled:data-indeterminate:border-transparent data-disabled:data-indeterminate:bg-layer-disabled data-disabled:data-indeterminate:text-icon-disabled",
  ),
  {
    variants: {
      tone: {
        neutral: "border-icon-tertiary",
        danger: "border-danger-strong",
      },
    },
  },
);

type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;

export type CheckboxTone = NonNullable<CheckboxVariantProps["tone"]>;
