import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { comboboxLabelVariants } from "./variants";

export type ComboboxLabelProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled combobox label. Graft in `components` via `<BaseCombobox.Label
 * render={<ComboboxLabel/>} />`.
 */
export function ComboboxLabel({ render, ...props }: ComboboxLabelProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: comboboxLabelVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
