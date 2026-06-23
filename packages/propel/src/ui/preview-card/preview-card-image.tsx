import type * as React from "react";

import { previewCardImageVariants } from "./variants";

export type PreviewCardImageProps = Omit<
  React.ComponentPropsWithoutRef<"img">,
  "className" | "style"
>;

/**
 * The thumbnail image shown inside the popup. Bakes in overflow-hidden and object-cover so the
 * thumbnail always clips and fills its container — these are "always the same" per the design spec.
 * Width and height are set by the consumer's layout.
 */
export function PreviewCardImage(props: PreviewCardImageProps) {
  return <img className={previewCardImageVariants()} {...props} />;
}
