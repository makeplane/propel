import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import type * as React from "react";

export type PreviewCardTriggerProps = Omit<
  React.ComponentProps<typeof BasePreviewCard.Trigger>,
  "className" | "style"
>;

/**
 * The link that opens the preview card on hover/focus. Renders an `<a>`; inherits its surrounding
 * text styling. Maps 1:1 to `PreviewCard.Trigger`.
 */
export function PreviewCardTrigger(props: PreviewCardTriggerProps) {
  return <BasePreviewCard.Trigger {...props} />;
}
