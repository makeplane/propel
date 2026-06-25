import type * as React from "react";

import { previewCardTitleVariants } from "./variants";

export type PreviewCardTitleProps = Omit<
  React.ComponentPropsWithoutRef<"p">,
  "className" | "style"
> & {
  /** The card's heading text. */
  children?: React.ReactNode;
};

/**
 * The card's primary heading. Bakes in the title font style — semibold 14px in primary text colour
 * — per the "always the same" items in the design spec.
 */
export function PreviewCardTitle(props: PreviewCardTitleProps) {
  return <p className={previewCardTitleVariants()} {...props} />;
}
