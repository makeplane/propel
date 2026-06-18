import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type * as React from "react";

import { accordionPanelVariants } from "./variants";

export type AccordionPanelProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Panel>,
  "className" | "style"
>;

/**
 * The collapsible content region for an item. Animates open/closed using Base UI's
 * `--accordion-panel-height` so the height transitions smoothly.
 */
export function AccordionPanel({ children, ...props }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel className={accordionPanelVariants()} {...props}>
      {children}
    </BaseAccordion.Panel>
  );
}
