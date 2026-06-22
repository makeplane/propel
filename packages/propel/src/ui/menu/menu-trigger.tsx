import { Menu as BaseMenu } from "@base-ui/react/menu";

export type MenuTriggerProps = Omit<BaseMenu.Trigger.Props, "className" | "style">;

/**
 * The element that opens the menu. Renders a `<button>` by default; pass `render` to project the
 * trigger onto your own element.
 */
export function MenuTrigger(props: MenuTriggerProps) {
  return <BaseMenu.Trigger {...props} />;
}
