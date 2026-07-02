import { Menu as BaseMenu } from "@base-ui/react/menu";

import { MenubarTrigger as MenubarTriggerElement } from "../../elements/menubar";

export type MenubarTriggerProps = Omit<BaseMenu.Trigger.Props, "className" | "style">;

/**
 * The ready-made top-level menubar trigger: grafts Base UI's `Menu.Trigger` disclosure behavior
 * onto the styled `MenubarTrigger` (behavior part outer, styled part as the render target). Place
 * it inside a `Menu` root within a `Menubar`, composing its anatomy — an optional leading
 * `MenubarTriggerIcon` and a `MenubarTriggerLabel` — as children.
 */
export function MenubarTrigger(props: MenubarTriggerProps) {
  return <BaseMenu.Trigger {...props} render={<MenubarTriggerElement />} />;
}
