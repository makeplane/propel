import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import {
  AccordionTrigger as AccordionTriggerElement,
  AccordionTriggerIcon,
  AccordionTriggerIndicator,
  AccordionTriggerTitle,
} from "../../elements/accordion";

export type AccordionTriggerProps = Omit<BaseAccordion.Trigger.Props, "className" | "style"> & {
  /**
   * Node rendered before the label (inline-start), matching the Figma header icon. Sized to the
   * trigger's `--node-size`. Decorative, kept out of the name.
   */
  inlineStartNode?: React.ReactNode;
};

/**
 * The ready-made accordion trigger: grafts Base UI's trigger behavior onto the styled
 * `AccordionTrigger`, composing an optional `inlineStartNode`, the `AccordionTriggerTitle`, and the
 * `AccordionTriggerIndicator` chevron that rotates when the panel opens.
 */
export function AccordionTrigger({ inlineStartNode, children, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger {...props} render={<AccordionTriggerElement />}>
      {inlineStartNode ? <AccordionTriggerIcon>{inlineStartNode}</AccordionTriggerIcon> : null}
      <AccordionTriggerTitle>{children}</AccordionTriggerTitle>
      <AccordionTriggerIndicator>
        <ChevronDown />
      </AccordionTriggerIndicator>
    </BaseAccordion.Trigger>
  );
}
