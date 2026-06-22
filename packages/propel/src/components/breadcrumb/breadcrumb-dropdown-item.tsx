import { Menu } from "@base-ui/react/menu";

export type BreadcrumbDropdownItemProps = Omit<Menu.Item.Props, "className" | "style">;

/** A single item inside `BreadcrumbDropdown`. */
export function BreadcrumbDropdownItem(props: BreadcrumbDropdownItemProps) {
  return (
    <Menu.Item
      className="flex cursor-default items-center rounded-sm px-2 py-1 text-14 leading-[1.54] text-secondary outline-none select-none data-highlighted:bg-layer-transparent-hover data-highlighted:text-primary"
      {...props}
    />
  );
}
