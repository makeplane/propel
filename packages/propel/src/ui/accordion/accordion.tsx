import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { AccordionRoot } from "@base-ui/react/accordion";

import { accordionVariants } from "./variants";

export type AccordionProps<Value = string> = Omit<
  AccordionRoot.Props<Value>,
  "className" | "style"
>;

/**
 * Groups a set of `AccordionItem`s. Single-open by default; pass `multiple` to allow several panels
 * open at once. Use `defaultValue` (uncontrolled) or `value` + `onValueChange` (controlled) to
 * drive which items are expanded.
 */
export function Accordion<Value = string>(props: AccordionProps<Value>) {
  return <BaseAccordion.Root className={accordionVariants()} {...props} />;
}
