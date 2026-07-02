import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { checkboxInlineStartNodeVariants } from "./variants";

export type CheckboxInlineStartNodeProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The decorative icon slot between the box and the label text (Figma "checkbox with label" icon
 * slot). Sizes its single child to `--node-size` (14px); pass a bare icon. Decorative — the box and
 * label carry the accessible name — so it is `aria-hidden`.
 */
export function CheckboxInlineStartNode({ render, ...props }: CheckboxInlineStartNodeProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: checkboxInlineStartNodeVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
