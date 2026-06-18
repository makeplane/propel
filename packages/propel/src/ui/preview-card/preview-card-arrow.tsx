import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import type * as React from "react";

export type PreviewCardArrowProps = Omit<
  React.ComponentProps<typeof BasePreviewCard.Arrow>,
  "className" | "style"
>;

/** The optional caret pointing from the popup back to the trigger. Maps 1:1 to `PreviewCard.Arrow`. */
export function PreviewCardArrow(props: PreviewCardArrowProps) {
  return <BasePreviewCard.Arrow {...props} />;
}
