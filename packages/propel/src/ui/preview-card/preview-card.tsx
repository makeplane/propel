import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

export type PreviewCardProps = Omit<BasePreviewCard.Root.Props, "className" | "style">;

/**
 * The root of a preview card — a popup that appears when a link is hovered, showing a preview for
 * sighted users. Maps 1:1 to Base UI's `PreviewCard.Root`.
 */
export function PreviewCard(props: PreviewCardProps) {
  return <BasePreviewCard.Root {...props} />;
}
