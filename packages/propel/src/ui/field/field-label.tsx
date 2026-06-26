import { Field as BaseField } from "@base-ui/react/field";

import { fieldLabelVariants, type FieldLabelVariantProps } from "./variants";

export type FieldLabelProps = Omit<BaseField.Label.Props, "className" | "style"> &
  FieldLabelVariantProps;

/** The label naming a field's control. */
export function FieldLabel({ magnitude, inset, ...props }: FieldLabelProps) {
  return <BaseField.Label className={fieldLabelVariants({ magnitude, inset })} {...props} />;
}
