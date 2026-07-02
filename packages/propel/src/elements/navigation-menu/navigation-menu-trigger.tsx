import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { navigationMenuTriggerVariants } from "./variants";

export type NavigationMenuTriggerProps = Omit<
  useRender.ComponentProps<"button">,
  "className" | "style"
>;

/**
 * The styled button that opens an item's `Content`. Base-UI-agnostic — graft the trigger behavior
 * in `components` via `<BaseNavigationMenu.Trigger render={<NavigationMenuTrigger />} />`; Base UI
 * reflects open state as `[data-popup-open]`.
 */
export function NavigationMenuTrigger({ render, ...props }: NavigationMenuTriggerProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: navigationMenuTriggerVariants(),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
