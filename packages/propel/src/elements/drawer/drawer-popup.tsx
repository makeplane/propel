import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type DrawerPopupVariantProps, drawerPopupVariants } from "./variants";

export type { DrawerPopupSide } from "./variants";

export type DrawerPopupProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  DrawerPopupVariantProps;

/**
 * The styled sliding panel. Anchored to `side` ("start" or "end") and slides in/out using Base UI's
 * `data-starting-style`/`data-ending-style` transforms; the leading-edge shadow border follows the
 * same side. Base-UI-agnostic — graft the drawer behavior in `components` via `<BaseDrawer.Popup
 * render={<DrawerPopup side={…} />} />`.
 */
export function DrawerPopup({ side, render, ...props }: DrawerPopupProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: drawerPopupVariants({ side }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
