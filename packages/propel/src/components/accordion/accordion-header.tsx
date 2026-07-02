import { Accordion as BaseAccordion } from "@base-ui/react/accordion";

import { AccordionHeader as AccordionHeaderElement } from "../../elements/accordion";

export type AccordionHeaderProps = Omit<BaseAccordion.Header.Props, "className" | "style">;

/**
 * The heading wrapper for an accordion trigger. Grafts Base UI's header behavior onto the styled
 * `AccordionHeader`.
 */
export function AccordionHeader(props: AccordionHeaderProps) {
  return <BaseAccordion.Header {...props} render={<AccordionHeaderElement />} />;
}
