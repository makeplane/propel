import { Field as BaseField } from "@base-ui/react/field";

import { fieldVariants } from "./variants";

export type FieldProps = Omit<BaseField.Root.Props, "className" | "style">;

/**
 * The shared field chrome for custom controls. Compose it with `FieldLabel`, `InputFieldControl` or
 * `TextAreaFieldControl`, `FieldDescription`, and `FieldError`.
 */
export function Field(props: FieldProps) {
  return <BaseField.Root className={fieldVariants()} {...props} />;
}
