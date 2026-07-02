import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { navigationMenuIconVariants } from "./variants";

export type NavigationMenuIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The styled disclosure caret rendered inside a `NavigationMenuTrigger`; rotates while the popup is
 * open, reading the parent trigger's `group-data-popup-open` state. Base-UI-agnostic — graft in
 * `components` via `<BaseNavigationMenu.Icon render={<NavigationMenuIcon />} />`.
 */
export function NavigationMenuIcon({ render, ...props }: NavigationMenuIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: navigationMenuIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
