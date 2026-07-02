import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { previewCardPopupVariants } from "./variants";

export type PreviewCardPopupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled card surface that holds the rich link preview. Graft in `components` via
 * `<BasePreviewCard.Popup render={<PreviewCardPopup />} />`.
 */
export function PreviewCardPopup({ render, ...props }: PreviewCardPopupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: previewCardPopupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
