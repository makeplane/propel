import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";

export type NavItemPanelProps = Omit<BaseCollapsible.Panel.Props, "className" | "style">;

/** Collapsible content controlled by the preceding `NavItemHeader`. */
export function NavItemPanel(props: NavItemPanelProps) {
  return <BaseCollapsible.Panel className="flex flex-col gap-1" {...props} />;
}
