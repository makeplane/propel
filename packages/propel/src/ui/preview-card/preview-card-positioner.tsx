import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

import { previewCardPositionerVariants } from "./variants";

export type PreviewCardPositionerProps = Omit<
  BasePreviewCard.Positioner.Props,
  "className" | "style"
>;

/**
 * Anchors the popup to the trigger via the underlying positioning engine. Maps 1:1 to
 * `PreviewCard.Positioner`.
 */
export function PreviewCardPositioner(props: PreviewCardPositionerProps) {
  return <BasePreviewCard.Positioner className={previewCardPositionerVariants()} {...props} />;
}
