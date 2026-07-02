import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { contextMenuGroupLabelVariants } from "./variants";

export type ContextMenuGroupLabelProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
>;

/**
 * The styled non-interactive section heading. Base-UI-agnostic — graft in `components` via
 * `<BaseContextMenu.GroupLabel render={<ContextMenuGroupLabel/>} />`.
 */
export function ContextMenuGroupLabel({ render, ...props }: ContextMenuGroupLabelProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: contextMenuGroupLabelVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
