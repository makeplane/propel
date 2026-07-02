import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import {
  AccordionTrigger as AccordionTriggerElement,
  AccordionTriggerTitle,
} from "../../elements/accordion";
import { DisclosureIndicator } from "../../internal/disclosure-indicator";
import { Icon } from "../../internal/icon";

export type AccordionTriggerProps = Omit<BaseAccordion.Trigger.Props, "className" | "style"> & {
  /**
   * Node rendered before the label (inline-start), matching the Figma header icon. Sized to the
   * trigger's `--node-size`. Decorative, kept out of the name.
   */
  icon?: React.ReactNode;
};

/**
 * The ready-made accordion trigger: grafts Base UI's trigger behavior onto the styled
 * `AccordionTrigger`, composing an optional `icon`, the `AccordionTriggerTitle`, and the
 * `AccordionTriggerIndicator` chevron that rotates when the panel opens.
 */
export function AccordionTrigger({ icon, children, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger {...props} render={<AccordionTriggerElement />}>
      {icon ? <Icon tint="secondary">{icon}</Icon> : null}
      <AccordionTriggerTitle>{children}</AccordionTriggerTitle>
      <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
        <ChevronDown />
      </DisclosureIndicator>
    </BaseAccordion.Trigger>
  );
}
