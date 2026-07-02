import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { navigationMenuPopupVariants } from "./variants";

export type NavigationMenuPopupProps = Omit<useRender.ComponentProps<"nav">, "className" | "style">;

/**
 * The styled anchored surface that houses the active item's `Content`. Base-UI-agnostic — graft in
 * `components` via `<BaseNavigationMenu.Popup render={<NavigationMenuPopup />} />`.
 */
export function NavigationMenuPopup({ render, ...props }: NavigationMenuPopupProps) {
  const defaultProps: useRender.ElementProps<"nav"> = { className: navigationMenuPopupVariants() };
  return useRender({ defaultTagName: "nav", render, props: mergeProps(defaultProps, props) });
}
