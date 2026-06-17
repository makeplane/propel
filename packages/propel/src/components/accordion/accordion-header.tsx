import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type * as React from "react";

export type AccordionHeaderProps = Omit<
  React.ComponentProps<typeof BaseAccordion.Header>,
  "className" | "render" | "style"
>;

/** The heading wrapper for an accordion trigger. */
export function AccordionHeader(props: AccordionHeaderProps) {
  return <BaseAccordion.Header className="flex" {...props} />;
}
