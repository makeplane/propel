import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import type * as React from "react";

export type PreviewCardViewportProps = Omit<
  React.ComponentProps<typeof BasePreviewCard.Viewport>,
  "className" | "style"
>;

/**
 * The container enabling direction-aware content transitions when the card moves between triggers.
 * Maps 1:1 to `PreviewCard.Viewport`.
 */
export function PreviewCardViewport(props: PreviewCardViewportProps) {
  return <BasePreviewCard.Viewport {...props} />;
}
