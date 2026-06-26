import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

export type PreviewCardPortalProps = Omit<BasePreviewCard.Portal.Props, "className" | "style">;

/** Portals the positioned popup out to the end of `document.body`. Maps 1:1 to `PreviewCard.Portal`. */
export function PreviewCardPortal(props: PreviewCardPortalProps) {
  return <BasePreviewCard.Portal {...props} />;
}
