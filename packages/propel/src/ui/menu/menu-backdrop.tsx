import { Menu as BaseMenu } from "@base-ui/react/menu";

export type MenuBackdropProps = Omit<BaseMenu.Backdrop.Props, "className" | "style">;

/** An overlay rendered beneath the menu popup. Wraps `Menu.Backdrop` 1:1. */
export function MenuBackdrop(props: MenuBackdropProps) {
  return <BaseMenu.Backdrop {...props} />;
}
