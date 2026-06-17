import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type * as React from "react";

export type AccordionItemProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Item>,
  "className" | "render" | "style"
>;

/** A single collapsible section: pairs an `AccordionHeader` and `AccordionPanel`. */
export function AccordionItem(props: AccordionItemProps) {
  return <BaseAccordion.Item className="border-b border-subtle" {...props} />;
}
