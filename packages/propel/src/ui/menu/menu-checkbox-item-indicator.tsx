import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Check } from "lucide-react";
import type * as React from "react";

import { menuItemIndicatorVariants } from "./variants";

export type MenuCheckboxItemIndicatorProps = Omit<
  React.ComponentProps<typeof BaseMenu.CheckboxItemIndicator>,
  "className" | "style"
>;

/** Shows whether the checkbox item is ticked. Wraps `Menu.CheckboxItemIndicator` 1:1. */
export function MenuCheckboxItemIndicator(props: MenuCheckboxItemIndicatorProps) {
  return (
    <BaseMenu.CheckboxItemIndicator className={menuItemIndicatorVariants()} {...props}>
      {props.children ?? <Check className="size-4" aria-hidden="true" />}
    </BaseMenu.CheckboxItemIndicator>
  );
}
