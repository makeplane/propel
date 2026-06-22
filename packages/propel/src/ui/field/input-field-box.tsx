import type * as React from "react";

import { type InputMagnitude, type InputTone, inputFieldBoxVariants } from "./variants";

export type InputFieldBoxProps = Omit<React.ComponentProps<"div">, "className" | "style"> & {
  /** Magnitude scale. `md` | `lg` | `xl`. */
  magnitude: InputMagnitude;
  /** Resting treatment. `neutral` | `danger`. */
  tone: InputTone;
};

/** The bordered box that frames the `InputField` control and its inline slots. */
export function InputFieldBox({ magnitude, tone, ...props }: InputFieldBoxProps) {
  return <div className={inputFieldBoxVariants({ magnitude, tone })} {...props} />;
}
