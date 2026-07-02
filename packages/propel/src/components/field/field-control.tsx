import { Field as BaseField } from "@base-ui/react/field";

export type FieldControlProps = Omit<BaseField.Control.Props, "className" | "style">;

/**
 * Base UI's `Field.Control` — registers the form control with the surrounding `Field` (name,
 * validation, `data-invalid` propagation). Graft a styled control via `render`: `<FieldControl
 * render={<Input magnitude="md" />} />`.
 */
export function FieldControl(props: FieldControlProps) {
  return <BaseField.Control {...props} />;
}
