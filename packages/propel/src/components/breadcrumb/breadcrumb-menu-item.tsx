import { DropdownItem, type DropdownItemProps } from "../dropdown/index";

export type BreadcrumbMenuItemProps = DropdownItemProps;

/** A row in a `BreadcrumbMenu`. */
export function BreadcrumbMenuItem(props: BreadcrumbMenuItemProps) {
  return <DropdownItem {...props} />;
}
