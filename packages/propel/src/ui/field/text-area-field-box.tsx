import type * as React from "react";

import { type InputTone, textAreaFieldBoxVariants } from "./variants";

export type TextAreaFieldBoxProps = Omit<React.ComponentProps<"div">, "className" | "style"> & {
  /** Resting treatment. `neutral` | `danger`. */
  tone: InputTone;
};

/** The bordered box that frames the `TextAreaField` control. */
export function TextAreaFieldBox({ tone, ...props }: TextAreaFieldBoxProps) {
  return <div className={textAreaFieldBoxVariants({ tone })} {...props} />;
}
