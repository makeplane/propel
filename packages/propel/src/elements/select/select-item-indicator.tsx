import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { selectItemIndicatorVariants } from "./variants";

export type SelectItemIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The selection checkmark slot inside an item. Renders whatever svg you pass as `children` (sized
 * to 1rem). Base-UI-agnostic — graft the visibility behavior in `components` via
 * `<BaseSelect.ItemIndicator render={<SelectItemIndicator/>} />`.
 */
export function SelectItemIndicator({ render, ...props }: SelectItemIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: selectItemIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
