import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";

export type NavItemGroupProps = Omit<BaseCollapsible.Root.Props, "className" | "style">;

/** A collapsible sidebar section. Sections start open by default. */
export function NavItemGroup({ defaultOpen = true, ...props }: NavItemGroupProps) {
  return <BaseCollapsible.Root defaultOpen={defaultOpen} {...props} />;
}
