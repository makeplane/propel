import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import type * as React from "react";

export type PreviewCardPortalProps = React.ComponentProps<typeof BasePreviewCard.Portal>;

/** Portals the positioned popup out to the end of `document.body`. Maps 1:1 to `PreviewCard.Portal`. */
export function PreviewCardPortal(props: PreviewCardPortalProps) {
  return <BasePreviewCard.Portal {...props} />;
}
