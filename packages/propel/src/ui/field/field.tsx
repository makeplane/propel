import { Field as BaseField } from "@base-ui/react/field";

export type FieldProps = Omit<BaseField.Root.Props, "className" | "style">;

/**
 * The shared field chrome for custom controls. Compose it with `FieldLabel`, `InputFieldControl` or
 * `TextAreaFieldControl`, `FieldDescription`, and `FieldError`.
 */
export function Field(props: FieldProps) {
  return <BaseField.Root className="flex flex-col gap-1.5" {...props} />;
}
