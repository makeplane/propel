import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { comboboxEmptyVariants } from "./variants";

export type ComboboxEmptyProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled empty-state row. Graft in `components` via `<BaseCombobox.Empty
 * render={<ComboboxEmpty/>} />`.
 */
export function ComboboxEmpty({ render, ...props }: ComboboxEmptyProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: comboboxEmptyVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
