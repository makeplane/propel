import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

import { previewCardBackdropVariants } from "./variants";

export type PreviewCardBackdropProps = Omit<BasePreviewCard.Backdrop.Props, "className" | "style">;

/** The dimmed overlay rendered behind the popup. Maps 1:1 to `PreviewCard.Backdrop`. */
export function PreviewCardBackdrop(props: PreviewCardBackdropProps) {
  return <BasePreviewCard.Backdrop className={previewCardBackdropVariants()} {...props} />;
}
