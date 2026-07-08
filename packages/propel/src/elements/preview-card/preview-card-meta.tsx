import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { previewCardMetaVariants } from "./variants";

export type PreviewCardMetaProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The muted footer caption closing out the card's text content (a source domain, a relative
 * timestamp, …).
 */
export function PreviewCardMeta({ render, ...props }: PreviewCardMetaProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: previewCardMetaVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
