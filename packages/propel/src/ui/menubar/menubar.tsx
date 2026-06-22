import { Menubar as BaseMenubar } from "@base-ui/react/menubar";

import { menubarVariants } from "./variants";

export type MenubarProps = Omit<BaseMenubar.Props, "className" | "style">;

/**
 * The container for an application menu bar — wraps a horizontal row of `Menu.Root`s so they share
 * arrow-key navigation and single-open behavior. Maps 1:1 to Base UI's `Menubar`.
 */
export function Menubar(props: MenubarProps) {
  return <BaseMenubar className={menubarVariants()} {...props} />;
}
