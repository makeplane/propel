import { MenuContentSurface, type MenuContentProps } from "./menu-content.shared";

export type { MenuContentProps } from "./menu-content.shared";

/** The menu surface: portal + positioner + popup with Propel overlay styling. */
export function MenuContent({
  side = "bottom",
  sideOffset = 4,
  align = "start",
  ...props
}: MenuContentProps) {
  return <MenuContentSurface side={side} sideOffset={sideOffset} align={align} {...props} />;
}
