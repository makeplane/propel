import { Input as BaseInput } from "@base-ui/react/input";

import { Input as InputElement, type InputProps } from "../../elements/input/input";

export type { InputProps };
export type { InputMagnitude } from "../../elements/input/input";

/**
 * Single-line text field that automatically works inside `Field`. Base UI's `Input` control
 * behavior grafted onto the styled `elements` `Input` element (rule 1a) — behavior part outer,
 * styled part as the render target.
 */
export function Input({ magnitude, ...props }: InputProps) {
  return <BaseInput {...props} render={<InputElement magnitude={magnitude} />} />;
}
