import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

export type MenuTriggerProps = Omit<
  React.ComponentProps<typeof BaseMenu.Trigger>,
  "className" | "style"
>;

/**
 * The element that opens the menu. Renders a `<button>` by default; pass `render` to project the
 * trigger onto your own element.
 */
export function MenuTrigger(props: MenuTriggerProps) {
  return <BaseMenu.Trigger {...props} />;
}
