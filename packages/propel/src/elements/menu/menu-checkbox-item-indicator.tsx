import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuCheckboxItemIndicatorVariants } from "./variants";

export type MenuCheckboxItemIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The styled checkbox BOX shown at the leading edge of a checkbox item (16px hit-target, 14px inset
 * chrome that fills the accent on `data-checked`; its glyph child stays hidden until checked).
 * Base-UI-agnostic — graft the indicator behavior in `components` via
 * `<BaseMenu.CheckboxItemIndicator keepMounted render={<MenuCheckboxItemIndicator />} />` (keeping
 * it mounted shows the empty box when unchecked).
 */
export function MenuCheckboxItemIndicator({ render, ...props }: MenuCheckboxItemIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: menuCheckboxItemIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
