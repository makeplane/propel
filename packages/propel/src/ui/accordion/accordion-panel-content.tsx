import type * as React from "react";

import { accordionPanelContentVariants } from "./variants";

export type AccordionPanelContentProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> & {
  /** The panel's inner content shown while the item is expanded. */
  children?: React.ReactNode;
};

/**
 * The padded inner content of an `AccordionPanel`. The padding lives here rather than on the panel
 * itself, because the panel animates its height open/closed and padding there would offset the
 * measured height.
 */
export function AccordionPanelContent(props: AccordionPanelContentProps) {
  return <div className={accordionPanelContentVariants()} {...props} />;
}
