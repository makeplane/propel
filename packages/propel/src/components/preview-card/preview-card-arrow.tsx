import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

import { Arrow } from "../../internal/arrow";

export type PreviewCardArrowProps = Omit<BasePreviewCard.Arrow.Props, "className" | "style">;

/**
 * The optional caret pointing from the popup back to the trigger: Base UI `PreviewCard.Arrow`
 * behavior grafted onto the shared `internal/arrow` styled caret (tinted to the popup surface).
 */
export function PreviewCardArrow(props: PreviewCardArrowProps) {
  return <BasePreviewCard.Arrow {...props} render={<Arrow />} />;
}
