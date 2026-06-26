import { Field as BaseField } from "@base-ui/react/field";

import { type FieldDescriptionVariantProps, fieldDescriptionVariants } from "./variants";

export type { FieldDescriptionVariantProps } from "./variants";

export type FieldDescriptionProps = Omit<BaseField.Description.Props, "className" | "style"> &
  FieldDescriptionVariantProps;

/** Supporting / helper text for a custom field. */
export function FieldDescription({ magnitude, ...props }: FieldDescriptionProps) {
  return <BaseField.Description className={fieldDescriptionVariants({ magnitude })} {...props} />;
}
