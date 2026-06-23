import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { accordionTriggerIndicatorVariants } from "./variants";

export type AccordionTriggerIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret shown at the trigger's inline-end. Rotates when the item's panel opens.
 * Decorative (the trigger carries the a11y state), so it is `aria-hidden`. Defaults to a chevron;
 * pass `children` to use a different glyph.
 */
export function AccordionTriggerIndicator({ children, ...props }: AccordionTriggerIndicatorProps) {
  return (
    <span aria-hidden className={accordionTriggerIndicatorVariants()} {...props}>
      {children ?? <ChevronDown className="size-3.5" />}
    </span>
  );
}
