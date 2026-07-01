import type * as React from "react";

import { accordionTriggerIconVariants } from "./variants";

export type AccordionTriggerIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The bare icon to render (e.g. a Lucide glyph), sized to the trigger's `--node-size`. */
  children?: React.ReactNode;
};

/**
 * A decorative leading icon at the trigger's inline-start (the Figma header icon). Sizes its single
 * child to the trigger's `--node-size`, so callers pass a bare icon. Decorative (the trigger
 * carries the accessible name), so it is `aria-hidden`.
 */
export function AccordionTriggerIcon(props: AccordionTriggerIconProps) {
  return <span aria-hidden className={accordionTriggerIconVariants()} {...props} />;
}
