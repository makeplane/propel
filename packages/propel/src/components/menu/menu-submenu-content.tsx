import { MenuContentSurface, type MenuContentProps } from "./menu-content.shared";

export type MenuSubmenuContentProps = MenuContentProps;

/** The floating surface for a submenu. */
export function MenuSubmenuContent({
  side = "right",
  sideOffset = 4,
  align = "start",
  ...props
}: MenuSubmenuContentProps) {
  return <MenuContentSurface side={side} sideOffset={sideOffset} align={align} {...props} />;
}
