import { Accordion as BaseAccordion } from "@base-ui/react/accordion";

import { accordionTriggerVariants } from "./variants";

export type AccordionTriggerProps = Omit<BaseAccordion.Trigger.Props, "className" | "style">;

/**
 * The clickable control that opens and closes its panel. Base UI sets `aria-expanded` and
 * `aria-controls` for you.
 */
export function AccordionTrigger(props: AccordionTriggerProps) {
  return <BaseAccordion.Trigger className={accordionTriggerVariants()} {...props} />;
}
