import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cx } from "class-variance-authority";
import type * as React from "react";

export type MenuSubTriggerProps = Omit<
  React.ComponentProps<typeof BaseMenu.SubmenuTrigger>,
  "className" | "style" | "label"
>;

/** The row that opens a submenu. Wraps `Menu.SubmenuTrigger` 1:1. */
export function MenuSubTrigger({ children, ...props }: MenuSubTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      className={cx(
        "group/item flex h-[34px] w-full cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
        "text-secondary",
        "data-highlighted:bg-layer-transparent-hover data-popup-open:bg-layer-transparent-hover",
        "data-disabled:pointer-events-none data-disabled:text-disabled",
      )}
      {...props}
    >
      {children}
    </BaseMenu.SubmenuTrigger>
  );
}
