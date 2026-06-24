import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";

import { navItemPanelVariants } from "./variants";

export type NavItemPanelProps = Omit<BaseCollapsible.Panel.Props, "className" | "style">;

/** Collapsible content controlled by the preceding `NavItemHeader`. */
export function NavItemPanel(props: NavItemPanelProps) {
  return <BaseCollapsible.Panel className={navItemPanelVariants()} {...props} />;
}
