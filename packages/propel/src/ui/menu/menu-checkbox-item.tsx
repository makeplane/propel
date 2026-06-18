import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cx } from "class-variance-authority";
import type * as React from "react";

export type MenuCheckboxItemProps = Omit<
  React.ComponentProps<typeof BaseMenu.CheckboxItem>,
  "className" | "style" | "label"
>;

/** A toggleable multi-select menu row with `role="menuitemcheckbox"`. Wraps `Menu.CheckboxItem` 1:1. */
export function MenuCheckboxItem({ children, ...props }: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      className={cx(
        "group/item flex h-[34px] w-full cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
        "text-secondary",
        "data-highlighted:bg-layer-transparent-hover",
        "data-disabled:pointer-events-none data-disabled:text-disabled",
      )}
      {...props}
    >
      {children}
    </BaseMenu.CheckboxItem>
  );
}
