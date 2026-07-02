import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toolbarGroupVariants } from "./variants";

export type ToolbarGroupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled cluster that packs related controls with a small gap. Base-UI-agnostic: graft the
 * group behavior in `components` via `<BaseToolbar.Group render={<ToolbarGroup/>} />`.
 */
export function ToolbarGroup({ render, ...props }: ToolbarGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: toolbarGroupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
