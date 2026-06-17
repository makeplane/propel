import { Input as BaseInput } from "@base-ui/react/input";
import type * as React from "react";

import { inputVariants, type InputMagnitude } from "./input-styles";

export type { InputMagnitude };

export type InputProps = Omit<
  React.ComponentProps<typeof BaseInput>,
  "className" | "render" | "style"
> & {
  /** Text size for the input value. */
  magnitude: InputMagnitude;
};

/** Single-line native input element that automatically works inside `Field`. */
export function Input({ magnitude, ...props }: InputProps) {
  return <BaseInput className={inputVariants({ magnitude })} {...props} />;
}
