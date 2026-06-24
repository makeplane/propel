import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

import { previewCardArrowVariants } from "./variants";

export type PreviewCardArrowProps = Omit<BasePreviewCard.Arrow.Props, "className" | "style">;

/** The optional caret pointing from the popup back to the trigger. Maps 1:1 to `PreviewCard.Arrow`. */
export function PreviewCardArrow(props: PreviewCardArrowProps) {
  return <BasePreviewCard.Arrow className={previewCardArrowVariants()} {...props} />;
}
