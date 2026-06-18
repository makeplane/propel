import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import type * as React from "react";

export type PreviewCardProps = Omit<
  React.ComponentProps<typeof BasePreviewCard.Root>,
  "className" | "style"
>;

/**
 * The root of a preview card — a popup that appears when a link is hovered, showing a preview for
 * sighted users. Maps 1:1 to Base UI's `PreviewCard.Root`.
 */
export function PreviewCard(props: PreviewCardProps) {
  return <BasePreviewCard.Root {...props} />;
}
