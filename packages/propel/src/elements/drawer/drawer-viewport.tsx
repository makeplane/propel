import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { drawerViewportVariants } from "./variants";

export type DrawerViewportProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled fixed, full-screen layer that positions the popup against a screen edge. Wraps the
 * `DrawerPopup` and aligns it via layout. Base-UI-agnostic — graft the drawer behavior in
 * `components` via `<BaseDrawer.Viewport render={<DrawerViewport />} />`.
 */
export function DrawerViewport({ render, ...props }: DrawerViewportProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: drawerViewportVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
