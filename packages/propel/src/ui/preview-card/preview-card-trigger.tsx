import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

export type PreviewCardTriggerProps = Omit<BasePreviewCard.Trigger.Props, "className" | "style">;

/**
 * The link that opens the preview card on hover/focus. Renders an `<a>`; inherits its surrounding
 * text styling. Maps 1:1 to `PreviewCard.Trigger`.
 */
export function PreviewCardTrigger(props: PreviewCardTriggerProps) {
  return <BasePreviewCard.Trigger {...props} />;
}
