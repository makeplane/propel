import type * as React from "react";

import { inputFieldContentVariants } from "./variants";

export type InputFieldContentProps = Omit<React.ComponentProps<"div">, "className" | "style"> & {
  /** Label placement: `vertical` (label above) | `horizontal` (label beside). */
  orientation: "vertical" | "horizontal";
};

/** The control + helper-text column of `InputField`. */
export function InputFieldContent({ orientation, ...props }: InputFieldContentProps) {
  return <div className={inputFieldContentVariants({ orientation })} {...props} />;
}
