import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuSearchInputVariants } from "./variants";

export type MenuSearchInputProps = Omit<useRender.ComponentProps<"input">, "className" | "style">;

/**
 * The styled borderless text field inside `MenuSearch`. Base-UI-agnostic — the ready-made
 * `MenuSearch` (`components`) stops keydown from bubbling so typing does not trigger the menu's own
 * type-ahead navigation.
 */
export function MenuSearchInput({ render, ...props }: MenuSearchInputProps) {
  const defaultProps: useRender.ElementProps<"input"> = { className: menuSearchInputVariants() };
  return useRender({ defaultTagName: "input", render, props: mergeProps(defaultProps, props) });
}
