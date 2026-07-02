import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { comboboxItemIndicatorVariants } from "./variants";

export type ComboboxItemIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The styled selection-marker slot inside an item. Base-UI-agnostic — graft in `components` via
 * `<BaseCombobox.ItemIndicator render={<ComboboxItemIndicator/>} />`.
 */
export function ComboboxItemIndicator({ render, ...props }: ComboboxItemIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: comboboxItemIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
