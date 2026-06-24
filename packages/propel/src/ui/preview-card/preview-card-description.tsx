import type * as React from "react";

import { previewCardDescriptionVariants } from "./variants";

export type PreviewCardDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<"p">,
  "className" | "style"
>;

/**
 * Supporting description text beneath the title. Bakes in the secondary text style — 13px in
 * secondary text colour — per the "always the same" items in the design spec.
 */
export function PreviewCardDescription(props: PreviewCardDescriptionProps) {
  return <p className={previewCardDescriptionVariants()} {...props} />;
}
