import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";

import { type FieldsetLegendVariantProps, fieldsetLegendVariants } from "./variants";

export type { FieldsetLegendVariantProps } from "./variants";

export type FieldsetLegendProps = Omit<BaseFieldset.Legend.Props, "className" | "style"> &
  FieldsetLegendVariantProps;

/** Accessible label associated with a `Fieldset`. */
export function FieldsetLegend({ magnitude, ...props }: FieldsetLegendProps) {
  return <BaseFieldset.Legend className={fieldsetLegendVariants({ magnitude })} {...props} />;
}
