import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { AccordionItem as BaseAccordionItem } from "@base-ui/react/accordion";

export type AccordionItemProps<Value = string> = Omit<
  BaseAccordionItem.Props,
  "className" | "render" | "style" | "value"
> & {
  /** Unique value that identifies this item within its `Accordion`. */
  value?: Value;
};

/** A single collapsible section: pairs an `AccordionHeader` and `AccordionPanel`. */
export function AccordionItem<Value = string>(props: AccordionItemProps<Value>) {
  return <BaseAccordion.Item className="border-b border-subtle" {...props} />;
}
