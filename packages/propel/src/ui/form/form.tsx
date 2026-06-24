import { Form as BaseForm } from "@base-ui/react/form";
import type { FormProps as BaseFormProps } from "@base-ui/react/form";

import { formVariants } from "./variants";

export type FormProps<FormValues extends Record<string, unknown> = Record<string, unknown>> = Omit<
  BaseFormProps<FormValues>,
  "className" | "style"
>;

/**
 * Native form element with Base UI consolidated error handling. Lays out its regions (`FormBody`,
 * `FormActions`) with a consistent vertical rhythm; field spacing and the actions-bar treatment
 * live on those parts.
 */
export function Form<FormValues extends Record<string, unknown> = Record<string, unknown>>(
  props: FormProps<FormValues>,
) {
  return <BaseForm className={formVariants()} {...props} />;
}
