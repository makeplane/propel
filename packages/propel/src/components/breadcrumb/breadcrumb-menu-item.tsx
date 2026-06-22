import { MenuItem, type MenuItemProps } from "../menu/index";

export type BreadcrumbMenuItemProps = MenuItemProps;

/** A row in a `BreadcrumbMenu`. */
export function BreadcrumbMenuItem(props: BreadcrumbMenuItemProps) {
  return <MenuItem {...props} />;
}
