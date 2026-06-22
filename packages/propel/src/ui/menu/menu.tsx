import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { MenuRoot } from "@base-ui/react/menu";

export type MenuProps<Payload = unknown> = Omit<
  MenuRoot.Props<Payload>,
  "open" | "defaultOpen" | "onOpenChange" | "modal" | "children"
> & {
  /** Whether the menu is open. Controlled; pair with `onOpenChange`. */
  open?: boolean;
  /** Whether the menu is open on mount. Uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called with the next open state when the menu opens or closes. */
  onOpenChange?: MenuRoot.Props<Payload>["onOpenChange"];
  /** Modal behavior while open. @default false */
  modal?: MenuRoot.Props<Payload>["modal"];
  /** The trigger and menu surface (`MenuTrigger`, `MenuContent`). */
  children?: MenuRoot.Props<Payload>["children"];
};

export function Menu<Payload = unknown>(props: MenuProps<Payload>) {
  return <BaseMenu.Root {...props} />;
}
