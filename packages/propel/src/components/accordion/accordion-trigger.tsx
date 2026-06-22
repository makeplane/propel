import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import {
  AccordionTrigger as AccordionTriggerRoot,
  type AccordionTriggerProps as AccordionTriggerRootProps,
  AccordionTriggerIndicator,
  AccordionTriggerTitle,
} from "../../ui/accordion";

export type AccordionTriggerProps = AccordionTriggerRootProps & {
  /**
   * Node rendered before the label (inline-start), matching the Figma header icon. Sized to the
   * trigger's `--node-size`. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
};

/**
 * The ready-made accordion trigger: composes the atomic `AccordionTrigger` with an optional
 * `inlineStartNode`, the `AccordionTriggerTitle`, and the `AccordionTriggerIndicator` chevron that
 * rotates when the panel opens.
 */
export function AccordionTrigger({ inlineStartNode, children, ...props }: AccordionTriggerProps) {
  return (
    <AccordionTriggerRoot {...props}>
      {inlineStartNode ? (
        <NodeSlot aria-hidden className="text-icon-secondary">
          {inlineStartNode}
        </NodeSlot>
      ) : null}
      <AccordionTriggerTitle>{children}</AccordionTriggerTitle>
      <AccordionTriggerIndicator />
    </AccordionTriggerRoot>
  );
}
