import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { textAreaBoxVariants } from "./variants";

export type TextAreaBoxProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The bordered frame that wraps a `TextArea` leaf. Owns the border, radius, padding, and the
 * focus/error border treatments so a standalone textarea has the same chrome as one inside a
 * `Field`. Place a single `TextArea` (and any inline affordances) as its children.
 */
export function TextAreaBox({ render, ...props }: TextAreaBoxProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: textAreaBoxVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
