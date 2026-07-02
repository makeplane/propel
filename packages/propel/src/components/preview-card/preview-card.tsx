import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

export type PreviewCardProps = Omit<BasePreviewCard.Root.Props, "className" | "style">;

/**
 * The preview-card Root — Base UI's context/state provider (renders no element of its own). A
 * behavior-only role, so it lives in `components` (rules 1a, 2); the styled parts live in
 * `elements/preview-card` (and shared `internal/` primitives) and are grafted onto Base UI behavior
 * here.
 */
export function PreviewCard(props: PreviewCardProps) {
  return <BasePreviewCard.Root {...props} />;
}
