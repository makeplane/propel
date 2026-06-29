import type * as React from "react";

import { collapsiblePanelContentVariants } from "./variants";

export type CollapsiblePanelContentProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> & {
  /** The panel's inner content shown while expanded. */
  children?: React.ReactNode;
};

/**
 * The padded inner content of a `CollapsiblePanel`. The padding lives here rather than on the panel
 * itself, because the panel animates its height open/closed and padding there would offset the
 * measured height.
 */
export function CollapsiblePanelContent(props: CollapsiblePanelContentProps) {
  return <div className={collapsiblePanelContentVariants()} {...props} />;
}
