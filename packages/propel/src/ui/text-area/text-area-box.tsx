import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { textAreaBoxVariants, type TextAreaTone } from "./variants";

export type TextAreaBoxProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> & {
  /** Resting treatment. `neutral` | `danger` (the Figma "error" state). */
  tone: TextAreaTone;
};

/**
 * The bordered frame that wraps a `TextArea` leaf. Owns the border, radius, padding, and the
 * focus/error border treatments so a standalone textarea has the same chrome as one inside a
 * `Field`. Place a single `TextArea` (and any inline affordances) as its children.
 */
export function TextAreaBox({ tone, render, ...props }: TextAreaBoxProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: textAreaBoxVariants({ tone }) };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
