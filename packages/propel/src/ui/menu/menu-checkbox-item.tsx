import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cx } from "class-variance-authority";

export type MenuCheckboxItemProps = Omit<
  BaseMenu.CheckboxItem.Props,
  "className" | "style" | "label"
>;

/** A toggleable multi-select menu row with `role="menuitemcheckbox"`. Wraps `Menu.CheckboxItem` 1:1. */
export function MenuCheckboxItem(props: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      className={cx(
        "group/item flex h-[34px] w-full cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
        "text-secondary",
        "data-highlighted:bg-layer-transparent-hover",
        "data-disabled:pointer-events-none data-disabled:text-disabled",
      )}
      {...props}
    />
  );
}
