import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuRadioItemIndicatorVariants } from "./variants";

export type MenuRadioItemIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The styled accent dot shown when a radio item is selected. Base-UI-agnostic — graft the indicator
 * behavior in `components` via `<BaseMenu.RadioItemIndicator render={<MenuRadioItemIndicator />}
 * />`.
 */
export function MenuRadioItemIndicator({ render, ...props }: MenuRadioItemIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: menuRadioItemIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
