import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { AccordionRoot } from "@base-ui/react/accordion";

import { accordionVariants } from "./variants";

// Mirror `BaseAccordion.Root`'s own `Value` generic (default `any`), so propel narrows nothing Base
// UI doesn't; callers can still parameterize it.
export type AccordionProps<Value = any> = Omit<AccordionRoot.Props<Value>, "className" | "style">;

/**
 * Groups a set of `AccordionItem`s. Single-open by default; pass `multiple` to allow several panels
 * open at once. Use `defaultValue` (uncontrolled) or `value` + `onValueChange` (controlled) to
 * drive which items are expanded.
 */
export function Accordion<Value = any>(props: AccordionProps<Value>) {
  return <BaseAccordion.Root className={accordionVariants()} {...props} />;
}
