import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { contextMenuItemShortcutVariants } from "./variants";

export type ContextMenuItemShortcutProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The keyboard-shortcut text region of a menu row, sitting at the row's inline-end. Decorative hint
 * (the row's label carries the accessible name), so it is `aria-hidden`. Base-UI-agnostic.
 */
export function ContextMenuItemShortcut({ render, ...props }: ContextMenuItemShortcutProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: contextMenuItemShortcutVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
