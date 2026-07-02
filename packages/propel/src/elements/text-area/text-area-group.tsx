import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { textAreaGroupVariants } from "./variants";

export type TextAreaGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The bordered frame that wraps a `TextArea` leaf. Owns the border, radius, padding, and the
 * focus/error border treatments so a standalone textarea has the same chrome as one inside a
 * `Field`. Place a single `TextArea` (and any inline affordances) as its children.
 */
export function TextAreaGroup({ render, ...props }: TextAreaGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: textAreaGroupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
