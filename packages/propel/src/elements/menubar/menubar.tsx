import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menubarVariants } from "./variants";

export type MenubarProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled menu-bar container: a horizontal row that lays out its top-level `MenubarTrigger`s.
 * Base-UI-agnostic — graft the menu-bar behavior (arrow-key navigation, single-open) in
 * `components` via `<BaseMenubar render={<Menubar/>} />`.
 */
export function Menubar({ render, ...props }: MenubarProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: menubarVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
