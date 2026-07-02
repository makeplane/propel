import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

export type PreviewCardTriggerProps = Omit<BasePreviewCard.Trigger.Props, "className" | "style">;

/**
 * The link that opens the preview card on hover or focus. Renders an `<a>` by default; pass
 * `render` to project the trigger onto your own element (e.g. an `AnchorButton` rendering an
 * `<a>`). Maps 1:1 to `PreviewCard.Trigger`.
 */
export function PreviewCardTrigger(props: PreviewCardTriggerProps) {
  return <BasePreviewCard.Trigger {...props} />;
}
