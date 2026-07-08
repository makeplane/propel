import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import {
  AccordionTriggerIcon,
  AccordionTrigger as AccordionTriggerElement,
  AccordionTriggerTitle,
} from "../../elements/accordion";
import { DisclosureIndicator } from "../../internal/disclosure-indicator";

export type AccordionTriggerProps = Omit<
  BaseAccordion.Trigger.Props,
  "children" | "className" | "style"
> & {
  /**
   * Element rendered before the label (inline-start), e.g. `<Icon icon={Folder} tint="secondary"
   * />`.
   */
  icon?: React.ReactNode;
  /** Visible trigger label. */
  label: string;
};

/**
 * The ready-made accordion trigger: grafts Base UI's trigger behavior onto the styled
 * `AccordionTrigger`, composing an optional `icon` (wrapped in `AccordionTriggerIcon` so it sizes
 * independently of the row), the `AccordionTriggerTitle`, and the `AccordionTriggerIndicator`
 * chevron that rotates when the panel opens.
 */
export function AccordionTrigger({ icon, label, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger {...props} render={<AccordionTriggerElement />}>
      {icon != null ? <AccordionTriggerIcon>{icon}</AccordionTriggerIcon> : null}
      <AccordionTriggerTitle>{label}</AccordionTriggerTitle>
      <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
        <ChevronDown />
      </DisclosureIndicator>
    </BaseAccordion.Trigger>
  );
}
