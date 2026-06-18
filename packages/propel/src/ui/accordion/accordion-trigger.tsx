import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type * as React from "react";

import { accordionTriggerVariants } from "./variants";

export type AccordionTriggerProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Trigger>,
  "className" | "style"
>;

/**
 * The clickable control that opens and closes its panel. Base UI sets `aria-expanded` and
 * `aria-controls` for you.
 */
export function AccordionTrigger({ children, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger className={accordionTriggerVariants()} {...props}>
      {children}
    </BaseAccordion.Trigger>
  );
}
