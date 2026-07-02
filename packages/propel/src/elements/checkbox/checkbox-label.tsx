import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { checkboxLabelVariants } from "./variants";

export type CheckboxLabelProps = Omit<useRender.ComponentProps<"label">, "className" | "style">;

/**
 * The clickable row chip that wraps a `Checkbox` box with an optional `CheckboxInlineStartNode` and
 * the label text, matching the Figma "Checkbox with label" component. Associate it with the box via
 * `htmlFor` so clicking anywhere in the row toggles the box. The row reads its disabled look off
 * the wrapped `Checkbox` (which carries `data-disabled`) via `:has()`, so it takes no `disabled`
 * prop.
 */
export function CheckboxLabel({ render, ...props }: CheckboxLabelProps) {
  const defaultProps: useRender.ElementProps<"label"> = { className: checkboxLabelVariants() };
  return useRender({ defaultTagName: "label", render, props: mergeProps(defaultProps, props) });
}
