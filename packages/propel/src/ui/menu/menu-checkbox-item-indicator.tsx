import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuCheckboxItemIndicatorVariants } from "./variants";

export type MenuCheckboxItemIndicatorProps = Omit<
  BaseMenu.CheckboxItemIndicator.Props,
  "className" | "style"
>;

/**
 * The checkbox BOX shown at the leading edge of a checkbox item. Renders
 * `Menu.CheckboxItemIndicator` styled as the box (via `menuCheckboxItemIndicatorVariants`) and
 * `keepMounted` so the empty bordered box is visible when unchecked — Base UI sets
 * `data-checked`/`data-unchecked` on it, filling the box and revealing the glyph child only when
 * ticked. Not a 1:1 wrap of `Menu.CheckboxItemIndicator` (it bakes the always-mounted box).
 */
export function MenuCheckboxItemIndicator(props: MenuCheckboxItemIndicatorProps) {
  return (
    <BaseMenu.CheckboxItemIndicator
      keepMounted
      className={menuCheckboxItemIndicatorVariants()}
      {...props}
    />
  );
}
