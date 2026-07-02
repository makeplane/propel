import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type MenuPopupVariantProps, menuPopupVariants } from "./variants";

export type MenuPopupProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  MenuPopupVariantProps;

/**
 * The styled menu surface that contains the items. Base-UI-agnostic — graft the menu behavior in
 * `components` via `<BaseMenu.Popup render={<MenuPopup elevation="…" />} />`.
 */
export function MenuPopup({ elevation, render, ...props }: MenuPopupProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: menuPopupVariants({ elevation }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
