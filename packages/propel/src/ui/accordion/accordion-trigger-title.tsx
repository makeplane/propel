import type * as React from "react";

import { accordionTriggerTitleVariants } from "./variants";

export type AccordionTriggerTitleProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The trigger's label content (typically the section's text). */
  children?: React.ReactNode;
};

/**
 * The trigger's label. Grows to fill the trigger row so a trailing `AccordionTriggerIndicator` sits
 * at the inline-end edge.
 */
export function AccordionTriggerTitle(props: AccordionTriggerTitleProps) {
  return <span className={accordionTriggerTitleVariants()} {...props} />;
}
