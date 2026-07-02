import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toolbarSeparatorVariants } from "./variants";

export type ToolbarSeparatorProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled thin vertical rule that divides one cluster of controls from the next.
 * Base-UI-agnostic: graft the separator behavior in `components` via `<BaseToolbar.Separator
 * render={<ToolbarSeparator/>} />`.
 */
export function ToolbarSeparator({ render, ...props }: ToolbarSeparatorProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: toolbarSeparatorVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
