import { Field as BaseField } from "@base-ui/react/field";

import { type InputFieldVariantProps, inputFieldVariants } from "./variants";

export type InputFieldProps = Omit<BaseField.Root.Props, "className" | "style"> &
  InputFieldVariantProps;

/** The Base UI `Field.Root` chrome for `InputField`, with orientation-aware layout. */
export function InputField({ orientation, ...props }: InputFieldProps) {
  return <BaseField.Root className={inputFieldVariants({ orientation })} {...props} />;
}
