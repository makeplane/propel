import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Check } from "lucide-react";
import type * as React from "react";

import { menuItemIndicatorVariants } from "./variants";

export type MenuRadioItemIndicatorProps = Omit<
  React.ComponentProps<typeof BaseMenu.RadioItemIndicator>,
  "className" | "style"
>;

/** Shows whether the radio item is selected. Wraps `Menu.RadioItemIndicator` 1:1. */
export function MenuRadioItemIndicator(props: MenuRadioItemIndicatorProps) {
  return (
    <BaseMenu.RadioItemIndicator className={menuItemIndicatorVariants()} {...props}>
      {props.children ?? <Check className="size-4" aria-hidden="true" />}
    </BaseMenu.RadioItemIndicator>
  );
}
