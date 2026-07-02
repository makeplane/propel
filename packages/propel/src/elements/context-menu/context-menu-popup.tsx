import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { contextMenuPopupVariants } from "./variants";

export type ContextMenuPopupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled menu surface. Base-UI-agnostic — graft the popup behavior in `components` via
 * `<BaseContextMenu.Popup render={<ContextMenuPopup/>} />`.
 */
export function ContextMenuPopup({ render, ...props }: ContextMenuPopupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: contextMenuPopupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
