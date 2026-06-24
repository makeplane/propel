import { Menu as BaseMenu } from "@base-ui/react/menu";
import { type VariantProps } from "class-variance-authority";

import { menuPopupVariants } from "./variants";

type MenuPopupSurface = NonNullable<VariantProps<typeof menuPopupVariants>["surface"]>;

export type MenuPopupProps = Omit<BaseMenu.Popup.Props, "className" | "style"> & {
  /**
   * Whether the popup paints its own chrome. `raised` is the standalone elevated surface; `inset`
   * is the padded list inside an `OverlayPanel` shell.
   */
  surface: MenuPopupSurface;
};

/** The menu surface that contains the items. Wraps `Menu.Popup` 1:1. */
export function MenuPopup({ surface, ...props }: MenuPopupProps) {
  return <BaseMenu.Popup className={menuPopupVariants({ surface })} {...props} />;
}
