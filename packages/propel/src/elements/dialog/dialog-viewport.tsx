import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { dialogViewportVariants } from "./variants";

export type DialogViewportProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The full-screen container that centers the popup and provides a scrollable area for tall content.
 * Base-UI-agnostic — graft the dialog behavior in `components` via `<BaseDialog.Viewport
 * render={<DialogViewport />} />`.
 */
export function DialogViewport({ render, ...props }: DialogViewportProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: dialogViewportVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
