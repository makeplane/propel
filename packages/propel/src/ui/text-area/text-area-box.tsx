import type * as React from "react";

import { textAreaBoxVariants, type TextAreaTone } from "./variants";

export type TextAreaBoxProps = Omit<React.ComponentProps<"div">, "className" | "style"> & {
  /** Resting treatment. `neutral` | `danger` (the Figma "error" state). */
  tone: TextAreaTone;
};

/**
 * The bordered frame that wraps a `TextArea` leaf. Owns the border, radius, padding, and the
 * focus/error border treatments so a standalone textarea has the same chrome as one inside a
 * `Field`. Place a single `TextArea` (and any inline affordances) as its children.
 */
export function TextAreaBox({ tone, ...props }: TextAreaBoxProps) {
  return <div className={textAreaBoxVariants({ tone })} {...props} />;
}
