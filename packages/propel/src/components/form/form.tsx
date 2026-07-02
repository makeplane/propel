import { Form as BaseForm } from "@base-ui/react/form";
import type { FormProps as BaseFormProps } from "@base-ui/react/form";

import { Form as FormElement } from "../../elements/form";

export type FormProps<FormValues extends Record<string, unknown> = Record<string, unknown>> = Omit<
  BaseFormProps<FormValues>,
  "className" | "style"
>;

/**
 * Native form element with Base UI consolidated error handling. Lays out its regions (`FormBody`,
 * `FormActions`) with a consistent vertical rhythm; field spacing and the actions-bar treatment
 * live on those parts. Grafts Base UI's form behavior onto the styled `Form` `<form>` frame.
 */
export function Form<FormValues extends Record<string, unknown> = Record<string, unknown>>(
  props: FormProps<FormValues>,
) {
  return <BaseForm {...props} render={<FormElement />} />;
}
