import { Menu } from "@base-ui/react/menu";
import type * as React from "react";

export type DropdownTriggerProps = Omit<
  React.ComponentProps<typeof Menu.Trigger>,
  "className" | "style"
>;

/**
 * The element that opens the menu. Renders a `<button>` by default; pass `render` to project the
 * trigger onto your own element.
 */
export function DropdownTrigger(props: DropdownTriggerProps) {
  return <Menu.Trigger {...props} />;
}
