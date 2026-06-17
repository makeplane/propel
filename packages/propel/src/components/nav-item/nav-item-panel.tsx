import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type * as React from "react";

export type NavItemPanelProps = Omit<
  React.ComponentProps<typeof BaseCollapsible.Panel>,
  "className" | "style"
>;

/** Collapsible content controlled by the preceding `NavItemHeader`. */
export function NavItemPanel(props: NavItemPanelProps) {
  return <BaseCollapsible.Panel className="flex flex-col gap-1" {...props} />;
}
