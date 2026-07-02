import { Menu as BaseMenu } from "@base-ui/react/menu";

import { PopupViewport } from "../../internal/popup-viewport";

export type MenuViewportProps = Omit<BaseMenu.Viewport.Props, "className" | "style" | "render">;

/**
 * The content-morph container for animated menus — Base UI's `Menu.Viewport` grafted onto the
 * shared relative viewport, so swapping popup content (e.g. drill-in panels) can transition sizes.
 */
export function MenuViewport(props: MenuViewportProps) {
  return <BaseMenu.Viewport {...props} render={<PopupViewport />} />;
}
