import { Accordion as BaseAccordion } from "@base-ui/react/accordion";

import { accordionPanelVariants } from "./variants";

export type AccordionPanelProps = Omit<BaseAccordion.Panel.Props, "className" | "style">;

/**
 * The collapsible content region for an item. Animates open/closed using Base UI's
 * `--accordion-panel-height` so the height transitions smoothly.
 */
export function AccordionPanel(props: AccordionPanelProps) {
  return <BaseAccordion.Panel className={accordionPanelVariants()} {...props} />;
}
