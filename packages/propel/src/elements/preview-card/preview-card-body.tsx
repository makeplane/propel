import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { previewCardBodyVariants } from "./variants";

export type PreviewCardBodyProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The text content area of the card — typically holds a `PreviewCardTitle` and
 * `PreviewCardDescription` stacked in a column. Owns the padding so a full-bleed `PreviewCardImage`
 * can sit edge-to-edge above it; both the column layout and the padding are "always the same" per
 * the design spec.
 */
export function PreviewCardBody({ render, ...props }: PreviewCardBodyProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: previewCardBodyVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
