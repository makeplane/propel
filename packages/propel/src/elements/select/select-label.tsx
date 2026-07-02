import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { selectLabelVariants } from "./variants";

export type SelectLabelProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled select label. Base-UI-agnostic — graft the label behavior in `components` via
 * `<BaseSelect.Label render={<SelectLabel/>} />`.
 */
export function SelectLabel({ render, ...props }: SelectLabelProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: selectLabelVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
