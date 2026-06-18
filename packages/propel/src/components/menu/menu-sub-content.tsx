import { MenuContentSurface, type MenuContentProps } from "./menu-content.shared";

export type MenuSubContentProps = MenuContentProps;

/** The floating surface for a submenu. */
export function MenuSubContent({
  side = "right",
  sideOffset = 4,
  align = "start",
  ...props
}: MenuSubContentProps) {
  return <MenuContentSurface side={side} sideOffset={sideOffset} align={align} {...props} />;
}
