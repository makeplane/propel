import type * as React from "react";

import {
  Collapsible as CollapsibleRoot,
  type CollapsibleProps as CollapsibleRootProps,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "../../ui/collapsible";

export type CollapsibleProps = CollapsibleRootProps & {
  /** The button content that opens and closes the panel. */
  trigger: React.ReactNode;
  /** The collapsible content region. */
  children: React.ReactNode;
};

/**
 * The ready-made collapsible: a single show/hide disclosure that wires the trigger and panel for
 * the 90% case. Pass `trigger` for the toggle button and `children` for the body; forward
 * `defaultOpen` (uncontrolled) or `open` + `onOpenChange` (controlled) to drive it.
 */
export function Collapsible({ trigger, children, ...props }: CollapsibleProps) {
  return (
    <CollapsibleRoot {...props}>
      <CollapsibleTrigger>{trigger}</CollapsibleTrigger>
      <CollapsiblePanel>{children}</CollapsiblePanel>
    </CollapsibleRoot>
  );
}
