import { DropdownPopup, type DropdownContentProps } from "./dropdown-content.shared";

export type { DropdownContentProps } from "./dropdown-content.shared";

/** The floating surface for a submenu. */
export function DropdownSubContent({
  side = "right",
  sideOffset = 4,
  align = "start",
  ...props
}: DropdownContentProps) {
  return <DropdownPopup side={side} sideOffset={sideOffset} align={align} {...props} />;
}
