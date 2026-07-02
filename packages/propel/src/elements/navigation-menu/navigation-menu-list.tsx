import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { navigationMenuListVariants } from "./variants";

export type NavigationMenuListProps = Omit<useRender.ComponentProps<"ul">, "className" | "style">;

/**
 * The styled horizontal row of top-level menu items. Base-UI-agnostic — graft the menu behavior in
 * `components` via `<BaseNavigationMenu.List render={<NavigationMenuList />} />`.
 */
export function NavigationMenuList({ render, ...props }: NavigationMenuListProps) {
  const defaultProps: useRender.ElementProps<"ul"> = { className: navigationMenuListVariants() };
  return useRender({ defaultTagName: "ul", render, props: mergeProps(defaultProps, props) });
}
