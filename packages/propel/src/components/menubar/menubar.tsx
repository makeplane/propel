import { Menubar as BaseMenubar } from "@base-ui/react/menubar";

import { Menubar as MenubarElement } from "../../elements/menubar/menubar";

export type MenubarProps = Omit<BaseMenubar.Props, "className" | "style">;

/**
 * The application menu bar: Base UI's `Menubar` behavior (arrow-key navigation, single-open)
 * grafted onto Propel's styled `Menubar` container. Hosts a horizontal row of `Menu` roots.
 */
export function Menubar(props: MenubarProps) {
  return <BaseMenubar {...props} render={<MenubarElement />} />;
}
