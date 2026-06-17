import { DropdownPopup, type DropdownContentProps } from "./dropdown-content.shared";

export type DropdownSubContentProps = DropdownContentProps;

/** The floating surface for a submenu. */
export function DropdownSubContent({
  side = "right",
  sideOffset = 4,
  align = "start",
  ...props
}: DropdownSubContentProps) {
  return <DropdownPopup side={side} sideOffset={sideOffset} align={align} {...props} />;
}
