import { MenuLinkItem, type MenuLinkItemProps } from "../menu/index";

export type BreadcrumbDropdownItemProps = MenuLinkItemProps;

/** A single navigational item inside `BreadcrumbDropdown`. */
export function BreadcrumbDropdownItem(props: BreadcrumbDropdownItemProps) {
  return <MenuLinkItem {...props} />;
}
