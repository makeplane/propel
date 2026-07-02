import { Menu as BaseMenu } from "@base-ui/react/menu";

export type MenuTriggerProps<Payload = unknown> = Omit<
  BaseMenu.Trigger.Props<Payload>,
  "className" | "style"
>;

/**
 * The button that opens the menu — Base UI's `Menu.Trigger` passthrough. Propel ships no menu
 * trigger chrome (any control can open a menu), so graft the behavior onto the control you already
 * have via `render` (`<MenuTrigger render={<Button …/>}>`); Base UI contributes the open/close
 * behavior, ARIA wiring, and `data-*` state.
 */
export function MenuTrigger<Payload = unknown>(props: MenuTriggerProps<Payload>) {
  return <BaseMenu.Trigger {...props} />;
}
