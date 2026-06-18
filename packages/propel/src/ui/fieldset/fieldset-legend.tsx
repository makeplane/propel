import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import { fieldsetLegendVariants } from "./variants";

type FieldsetLegendVariantProps = VariantProps<typeof fieldsetLegendVariants>;

export type FieldsetLegendProps = Omit<
  React.ComponentProps<typeof BaseFieldset.Legend>,
  "className" | "style"
> & {
  /** Legend text size. */
  magnitude: NonNullable<FieldsetLegendVariantProps["magnitude"]>;
};

/** Accessible label associated with a `Fieldset`. */
export function FieldsetLegend({ magnitude, ...props }: FieldsetLegendProps) {
  return <BaseFieldset.Legend className={fieldsetLegendVariants({ magnitude })} {...props} />;
}
