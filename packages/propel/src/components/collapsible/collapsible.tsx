import { ChevronDown } from "lucide-react";
import type * as React from "react";

import {
  Collapsible as CollapsibleRoot,
  type CollapsibleProps as CollapsibleRootProps,
  CollapsiblePanel,
  CollapsiblePanelContent,
  CollapsibleTrigger,
  CollapsibleTriggerIndicator,
  CollapsibleTriggerTitle,
} from "../../ui/collapsible";

export type CollapsibleProps = CollapsibleRootProps & {
  /** The button content that opens and closes the panel. */
  trigger: React.ReactNode;
  /** The collapsible content region. */
  children: React.ReactNode;
  /** Whether to show the rotating chevron indicator at the trigger's inline-end. */
  indicator: boolean;
};

/**
 * The ready-made collapsible: a single show/hide disclosure that wires the trigger and panel for
 * the 90% case. Pass `trigger` for the toggle button label and `children` for the body; forward
 * `defaultOpen` (uncontrolled) or `open` + `onOpenChange` (controlled) to drive it. Set
 * `indicator={false}` to omit the rotating chevron from the trigger.
 */
export function Collapsible({ trigger, children, indicator, ...props }: CollapsibleProps) {
  return (
    <CollapsibleRoot {...props}>
      <CollapsibleTrigger>
        <CollapsibleTriggerTitle>{trigger}</CollapsibleTriggerTitle>
        {indicator ? (
          <CollapsibleTriggerIndicator>
            <ChevronDown />
          </CollapsibleTriggerIndicator>
        ) : null}
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <CollapsiblePanelContent>{children}</CollapsiblePanelContent>
      </CollapsiblePanel>
    </CollapsibleRoot>
  );
}
