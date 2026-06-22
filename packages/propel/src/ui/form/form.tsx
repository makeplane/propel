import { Form as BaseForm } from "@base-ui/react/form";
import type { FormProps as BaseFormProps } from "@base-ui/react/form";

import { formVariants } from "./variants";

export type FormProps<FormValues extends Record<string, unknown> = Record<string, unknown>> = Omit<
  BaseFormProps<FormValues>,
  "className" | "style"
>;

/** Native form element with Base UI consolidated error handling. */
export function Form<FormValues extends Record<string, unknown> = Record<string, unknown>>(
  props: FormProps<FormValues>,
) {
  return <BaseForm className={formVariants()} {...props} />;
}
