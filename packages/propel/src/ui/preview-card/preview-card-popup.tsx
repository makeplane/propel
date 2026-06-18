import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import type * as React from "react";

import { previewCardPopupVariants } from "./variants";

export type PreviewCardPopupProps = Omit<
  React.ComponentProps<typeof BasePreviewCard.Popup>,
  "className" | "style"
>;

/** The anchored surface that holds the rich link preview. Maps 1:1 to `PreviewCard.Popup`. */
export function PreviewCardPopup(props: PreviewCardPopupProps) {
  return <BasePreviewCard.Popup className={previewCardPopupVariants()} {...props} />;
}
