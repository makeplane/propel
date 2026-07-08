import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { previewCardPropertyGroupVariants } from "./variants";

export type PreviewCardPropertyGroupProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
>;

/**
 * The row of property chips (status, priority, assignee, labels, …) shown beneath the description.
 * A bare flex-wrap row — the chips are the consumer's own components (`Pill`, `Avatar`, `Badge`,
 * …); this part only supplies the row layout. Never `aria-hidden`: its content is meaningful.
 */
export function PreviewCardPropertyGroup({ render, ...props }: PreviewCardPropertyGroupProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: previewCardPropertyGroupVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
