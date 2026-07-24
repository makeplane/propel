import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { buttonGroupVariants } from "./variants";

export type ButtonGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled connected container around `ButtonGroupButton`s — raised white surface, shared outer
 * border, dividers between items, and clipped corners. Base-UI-agnostic (there is no Base UI
 * button-group primitive); the `components` ready-made adds the `group` role and shares one `size`
 * with every item via context.
 */
export function ButtonGroup({ render, ...props }: ButtonGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: buttonGroupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
