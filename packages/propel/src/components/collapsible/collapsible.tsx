import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import {
  CollapsiblePanel,
  CollapsiblePanelContent,
  CollapsibleTrigger,
  CollapsibleTriggerTitle,
} from "../../elements/collapsible";
import { DisclosureIndicator } from "../../internal/disclosure-indicator";

export type CollapsibleProps = Omit<BaseCollapsible.Root.Props, "className" | "style"> & {
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
    <BaseCollapsible.Root {...props}>
      <BaseCollapsible.Trigger render={<CollapsibleTrigger />}>
        <CollapsibleTriggerTitle>{trigger}</CollapsibleTriggerTitle>
        {indicator ? (
          <DisclosureIndicator motion="disclose" tint="secondary" magnitude="inherit">
            <ChevronDown />
          </DisclosureIndicator>
        ) : null}
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel render={<CollapsiblePanel />}>
        <CollapsiblePanelContent>{children}</CollapsiblePanelContent>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
