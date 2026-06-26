import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuRadioItemIndicatorVariants } from "./variants";

export type MenuRadioItemIndicatorProps = Omit<
  BaseMenu.RadioItemIndicator.Props,
  "className" | "style"
>;

/** Shows whether the radio item is selected. Wraps `Menu.RadioItemIndicator` 1:1. */
export function MenuRadioItemIndicator(props: MenuRadioItemIndicatorProps) {
  return <BaseMenu.RadioItemIndicator className={menuRadioItemIndicatorVariants()} {...props} />;
}
