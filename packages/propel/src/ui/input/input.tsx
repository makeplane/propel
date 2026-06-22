import { Input as BaseInput } from "@base-ui/react/input";

import { inputVariants, type InputMagnitude } from "./variants";

export type { InputMagnitude };

export type InputProps = Omit<BaseInput.Props, "className" | "style"> & {
  /** Text size for the input value. */
  magnitude: InputMagnitude;
};

/** Single-line native input element that automatically works inside `Field`. */
export function Input({ magnitude, ...props }: InputProps) {
  return <BaseInput className={inputVariants({ magnitude })} {...props} />;
}
