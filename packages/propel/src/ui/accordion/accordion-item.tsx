import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { AccordionItem as BaseAccordionItem } from "@base-ui/react/accordion";

import { accordionItemVariants } from "./variants";

export type AccordionItemProps = Omit<BaseAccordionItem.Props, "className" | "style">;

/** A single collapsible section: pairs an `AccordionHeader` and `AccordionPanel`. */
export function AccordionItem(props: AccordionItemProps) {
  return <BaseAccordion.Item className={accordionItemVariants()} {...props} />;
}
