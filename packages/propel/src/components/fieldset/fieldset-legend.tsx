import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

const fieldsetLegendVariants = cva("font-medium text-primary", {
  variants: {
    magnitude: {
      md: "text-13",
      lg: "text-14",
      xl: "text-14",
    },
  },
});

type FieldsetLegendVariantProps = VariantProps<typeof fieldsetLegendVariants>;

export type FieldsetLegendProps = Omit<
  React.ComponentProps<typeof BaseFieldset.Legend>,
  "className" | "render" | "style"
> & {
  /** Legend text size. */
  magnitude: NonNullable<FieldsetLegendVariantProps["magnitude"]>;
};

/** Accessible label associated with a `Fieldset`. */
export function FieldsetLegend({ magnitude, ...props }: FieldsetLegendProps) {
  return <BaseFieldset.Legend className={fieldsetLegendVariants({ magnitude })} {...props} />;
}
