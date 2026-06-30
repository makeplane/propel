import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menubarTriggerVariants } from "./variants";

export type MenubarTriggerProps = Omit<useRender.ComponentProps<"button">, "className" | "style">;

/**
 * The styled trigger for a top-level menu item in the menu bar. A flex row that lays out its
 * anatomy parts — an optional leading `MenubarTriggerIcon` and a `MenubarTriggerLabel`. Bakes in
 * all the "always the same" chrome from the designer's spec: height, inline padding, font style,
 * focus ring, and the active/hover highlight when the popup is open. Renders a `<button>` by
 * default and stays icon-agnostic. It embeds no menu behavior, keeping `ui/menubar` independent of
 * the Menu primitive: a menubar composition grafts the disclosure/open behavior on by rendering it
 * as a menu trigger — `render={<Menu.Trigger />}` (the styled button stays the outer element) —
 * inside a `Menu` root within an enclosing `Menubar` that drives keyboard navigation.
 */
export function MenubarTrigger({ render, ...props }: MenubarTriggerProps) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps({ className: menubarTriggerVariants(), type: "button" }, props),
  });
}
