import { Menu as BaseMenu } from "@base-ui/react/menu";

export type MenuGroupProps = Omit<BaseMenu.Group.Props, "className" | "style">;

/**
 * Groups related menu items with their `MenuLabel` heading — Base UI's `Menu.Group` passthrough. A
 * structural role with no propel styling of its own, so it lives in `components` (rules 1a, 2).
 */
export function MenuGroup(props: MenuGroupProps) {
  return <BaseMenu.Group {...props} />;
}
