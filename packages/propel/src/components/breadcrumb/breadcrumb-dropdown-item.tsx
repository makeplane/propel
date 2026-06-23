import { Menu } from "@base-ui/react/menu";

import { crumbDropdownItemVariants } from "./variants";

export type BreadcrumbDropdownItemProps = Omit<Menu.Item.Props, "className" | "style">;

/** A single item inside `BreadcrumbDropdown`. */
export function BreadcrumbDropdownItem(props: BreadcrumbDropdownItemProps) {
  return <Menu.Item className={crumbDropdownItemVariants()} {...props} />;
}
