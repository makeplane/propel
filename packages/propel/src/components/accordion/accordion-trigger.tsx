import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import {
  AccordionTrigger as AccordionTriggerRoot,
  type AccordionTriggerProps as AccordionTriggerRootProps,
} from "../../ui/accordion";

export type AccordionTriggerProps = AccordionTriggerRootProps & {
  /**
   * Node rendered before the label (inline-start), matching the Figma header icon. Sized to the
   * trigger's `--node-size`. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
};

/**
 * The ready-made accordion trigger: composes the atomic `AccordionTrigger` and lays out an optional
 * `inlineStartNode`, the label, and the chevron that rotates when the panel opens.
 */
export function AccordionTrigger({ inlineStartNode, children, ...props }: AccordionTriggerProps) {
  return (
    <AccordionTriggerRoot {...props}>
      {inlineStartNode ? (
        <NodeSlot aria-hidden className="text-icon-secondary">
          {inlineStartNode}
        </NodeSlot>
      ) : null}
      <span className="flex-1">{children}</span>
      <ChevronDown
        aria-hidden
        className="size-3.5 shrink-0 text-icon-secondary transition-transform duration-200 group-data-panel-open:rotate-180"
      />
    </AccordionTriggerRoot>
  );
}
