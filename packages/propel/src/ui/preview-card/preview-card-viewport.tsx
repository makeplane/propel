import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

export type PreviewCardViewportProps = Omit<BasePreviewCard.Viewport.Props, "className" | "style">;

/**
 * The container enabling direction-aware content transitions when the card moves between triggers.
 * Maps 1:1 to `PreviewCard.Viewport`.
 */
export function PreviewCardViewport(props: PreviewCardViewportProps) {
  return <BasePreviewCard.Viewport {...props} />;
}
