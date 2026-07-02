import { Menu as BaseMenu } from "@base-ui/react/menu";

import { MenuSeparator as MenuSeparatorElement } from "../../elements/menu";

export type MenuSeparatorProps = Omit<BaseMenu.Separator.Props, "className" | "style">;

/**
 * Ready-made divider between groups of menu items: grafts Base UI's `Menu.Separator` behavior
 * (`role="separator"`) onto the styled `MenuSeparator` element.
 */
export function MenuSeparator(props: MenuSeparatorProps) {
  return <BaseMenu.Separator {...props} render={<MenuSeparatorElement />} />;
}
