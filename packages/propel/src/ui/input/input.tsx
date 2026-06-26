import { Input as BaseInput } from "@base-ui/react/input";

import { inputVariants, type InputMagnitude, type InputVariantProps } from "./variants";

export type { InputMagnitude };

export type InputProps = Omit<BaseInput.Props, "className" | "style"> & InputVariantProps;

/** Single-line native input element that automatically works inside `Field`. */
export function Input({ magnitude, ...props }: InputProps) {
  return <BaseInput className={inputVariants({ magnitude })} {...props} />;
}
