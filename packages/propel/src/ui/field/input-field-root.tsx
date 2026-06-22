import { Field as BaseField } from "@base-ui/react/field";

import { inputFieldRootVariants } from "./variants";

export type InputFieldRootProps = Omit<BaseField.Root.Props, "className" | "style"> & {
  /** Label placement: `vertical` (label above) | `horizontal` (label beside). */
  orientation: "vertical" | "horizontal";
};

/** The Base UI `Field.Root` chrome for `InputField`, with orientation-aware layout. */
export function InputFieldRoot({ orientation, ...props }: InputFieldRootProps) {
  return <BaseField.Root className={inputFieldRootVariants({ orientation })} {...props} />;
}
