import { DropdownPopup, type DropdownContentProps } from "./dropdown-content.shared";

export type { DropdownContentProps } from "./dropdown-content.shared";

/** The menu surface: portal + positioner + popup with Propel overlay styling. */
export function DropdownContent({
  side = "bottom",
  sideOffset = 4,
  align = "start",
  ...props
}: DropdownContentProps) {
  return <DropdownPopup side={side} sideOffset={sideOffset} align={align} {...props} />;
}
