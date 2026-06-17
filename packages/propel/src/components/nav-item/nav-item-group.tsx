import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type * as React from "react";

export type NavItemGroupProps = Omit<
  React.ComponentProps<typeof BaseCollapsible.Root>,
  "className" | "style"
>;

/** A collapsible sidebar section. Sections start open by default. */
export function NavItemGroup({ defaultOpen = true, ...props }: NavItemGroupProps) {
  return <BaseCollapsible.Root defaultOpen={defaultOpen} {...props} />;
}
