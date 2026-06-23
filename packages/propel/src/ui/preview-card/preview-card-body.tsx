import type * as React from "react";

import { previewCardBodyVariants } from "./variants";

export type PreviewCardBodyProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
>;

/**
 * The text content area of the card — typically holds a `PreviewCardTitle` and
 * `PreviewCardDescription` stacked in a column. Owns the padding so a full-bleed
 * `PreviewCardImage` can sit edge-to-edge above it; both the column layout and the
 * padding are "always the same" per the design spec.
 */
export function PreviewCardBody(props: PreviewCardBodyProps) {
  return <div className={previewCardBodyVariants()} {...props} />;
}
