import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuRowVariants } from "./variants";

export type MenuRadioItemProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * A styled menu row that behaves like a radio button. Base-UI-agnostic — graft the radio-item
 * behavior in `components` via `<BaseMenu.RadioItem render={<MenuRadioItem />} />`.
 */
export function MenuRadioItem({ render, ...props }: MenuRadioItemProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: menuRowVariants({ layout: "default" }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
