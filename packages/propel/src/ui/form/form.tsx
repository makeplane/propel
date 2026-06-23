import { Form as BaseForm } from "@base-ui/react/form";
import type { FormProps as BaseFormProps } from "@base-ui/react/form";
import type { VariantProps } from "class-variance-authority";

import { formVariants } from "./variants";

type FormVariantProps = Required<VariantProps<typeof formVariants>>;

export type FormProps<FormValues extends Record<string, unknown> = Record<string, unknown>> = Omit<
  BaseFormProps<FormValues>,
  "className" | "style"
> &
  FormVariantProps;

/** Native form element with Base UI consolidated error handling. */
export function Form<FormValues extends Record<string, unknown> = Record<string, unknown>>({
  layout,
  ...props
}: FormProps<FormValues>) {
  return <BaseForm className={formVariants({ layout })} {...props} />;
}
