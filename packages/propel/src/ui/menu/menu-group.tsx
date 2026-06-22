import { Menu as BaseMenu } from "@base-ui/react/menu";

export type MenuGroupProps = Omit<BaseMenu.Group.Props, "className" | "style">;

/** Groups related menu items so a `MenuLabel` can title them. */
export function MenuGroup(props: MenuGroupProps) {
  return <BaseMenu.Group {...props} />;
}
