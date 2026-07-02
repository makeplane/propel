import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { previewCardImageVariants } from "./variants";

export type PreviewCardImageProps = Omit<useRender.ComponentProps<"img">, "className" | "style">;

/**
 * The thumbnail image shown inside the popup. Bakes in overflow-hidden and object-cover so the
 * thumbnail always clips and fills its container — these are "always the same" per the design spec.
 * Width and height are set by the consumer's layout.
 */
export function PreviewCardImage({ render, ...props }: PreviewCardImageProps) {
  const defaultProps: useRender.ElementProps<"img"> = { className: previewCardImageVariants() };
  return useRender({ defaultTagName: "img", render, props: mergeProps(defaultProps, props) });
}
