import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type * as React from "react";

export type CollapsibleProps = Omit<
  React.ComponentProps<typeof BaseCollapsible.Root>,
  "className" | "style"
>;

/**
 * A single show/hide disclosure — the one-item primitive that `Accordion` generalizes. Uncontrolled
 * by default; pass `defaultOpen` (uncontrolled) or `open` + `onOpenChange` (controlled) to drive
 * it. Maps 1:1 to Base UI's `Collapsible.Root`.
 */
export function Collapsible(props: CollapsibleProps) {
  return <BaseCollapsible.Root {...props} />;
}
