import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

export type PreviewCardPortalProps = BasePreviewCard.Portal.Props;

/** Portals the positioned popup out to the end of `document.body`. Maps 1:1 to `PreviewCard.Portal`. */
export function PreviewCardPortal(props: PreviewCardPortalProps) {
  return <BasePreviewCard.Portal {...props} />;
}
