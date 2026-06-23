import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menubarTriggerVariants } from "./variants";

export type MenubarTriggerProps = Omit<BaseMenu.Trigger.Props, "className" | "style">;

/**
 * The styled trigger for a top-level menu item in the menu bar. A flex row that lays out its
 * anatomy parts — an optional leading `MenubarTriggerIcon` and a `MenubarTriggerLabel`. Bakes in
 * all the "always the same" chrome from the designer's spec: height, inline padding, font style,
 * focus ring, and the active/hover highlight when the popup is open. Renders inside a `Menu` root
 * and receives keyboard navigation from the enclosing `Menubar`.
 */
export function MenubarTrigger(props: MenubarTriggerProps) {
  return <BaseMenu.Trigger className={menubarTriggerVariants()} {...props} />;
}
