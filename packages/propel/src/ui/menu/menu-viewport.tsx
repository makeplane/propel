import { Menu as BaseMenu } from "@base-ui/react/menu";

export type MenuViewportProps = Omit<BaseMenu.Viewport.Props, "className" | "style">;

/**
 * A content wrapper inside the popup that morphs/clips during submenu or size transitions. Wraps
 * `Menu.Viewport` 1:1.
 */
export function MenuViewport(props: MenuViewportProps) {
  return <BaseMenu.Viewport className="relative" {...props} />;
}
