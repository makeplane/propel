import type * as React from "react";

import { accordionTriggerIndicatorVariants } from "./variants";

export type AccordionTriggerIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /**
   * The disclosure caret to render — any svg (e.g. a Lucide `ChevronDown`), sized to the trigger's
   * `--node-size`.
   */
  children?: React.ReactNode;
};

/**
 * The disclosure caret slot at the trigger's inline-end. Renders whatever svg you pass (sized to
 * the trigger's `--node-size`) and rotates toward the inline-end while collapsed, to point down
 * when the panel opens. Decorative — the trigger carries the a11y state — so it is `aria-hidden`.
 */
export function AccordionTriggerIndicator(props: AccordionTriggerIndicatorProps) {
  return <span aria-hidden className={accordionTriggerIndicatorVariants()} {...props} />;
}
