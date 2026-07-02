import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { linearProgressLabelVariants } from "./variants";

export type LinearProgressLabelProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The styled progress label. Base-UI-agnostic — graft in `components` via `<BaseProgress.Label
 * render={<LinearProgressLabel/>} />`.
 */
export function LinearProgressLabel({ render, ...props }: LinearProgressLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: linearProgressLabelVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
