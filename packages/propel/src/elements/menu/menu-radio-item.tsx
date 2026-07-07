import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type MenuRowVariantProps, menuRowVariants } from "./variants";

export type MenuRadioItemProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  Pick<MenuRowVariantProps, "tone">;

/**
 * A styled menu row that behaves like a radio button. Base-UI-agnostic — graft the radio-item
 * behavior in `components` via `<BaseMenu.RadioItem render={<MenuRadioItem />} />`.
 */
export function MenuRadioItem({ tone, render, ...props }: MenuRadioItemProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: menuRowVariants({ layout: "default", tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
