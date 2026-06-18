import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import type * as React from "react";

import { previewCardBackdropVariants } from "./variants";

export type PreviewCardBackdropProps = Omit<
  React.ComponentProps<typeof BasePreviewCard.Backdrop>,
  "className" | "style"
>;

/** The dimmed overlay rendered behind the popup. Maps 1:1 to `PreviewCard.Backdrop`. */
export function PreviewCardBackdrop(props: PreviewCardBackdropProps) {
  return <BasePreviewCard.Backdrop className={previewCardBackdropVariants()} {...props} />;
}
