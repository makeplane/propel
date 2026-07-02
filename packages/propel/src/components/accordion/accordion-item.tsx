import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { AccordionItem as BaseAccordionItem } from "@base-ui/react/accordion";

import { AccordionItem as AccordionItemElement } from "../../elements/accordion";

export type AccordionItemProps = Omit<BaseAccordionItem.Props, "className" | "style">;

/**
 * A single collapsible section: pairs an `AccordionHeader` and `AccordionPanel`. Grafts Base UI's
 * item behavior onto the styled `AccordionItem`.
 */
export function AccordionItem(props: AccordionItemProps) {
  return <BaseAccordion.Item {...props} render={<AccordionItemElement />} />;
}
