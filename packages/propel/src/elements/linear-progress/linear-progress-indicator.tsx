import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import {
  type LinearProgressIndicatorVariantProps,
  linearProgressIndicatorVariants,
} from "./variants";

export type LinearProgressIndicatorProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
> &
  LinearProgressIndicatorVariantProps;

/**
 * The styled fill bar. `tone` drives the fill color. Base-UI-agnostic — graft in `components` via
 * `<BaseProgress.Indicator render={<LinearProgressIndicator/>} />`.
 */
export function LinearProgressIndicator({ tone, render, ...props }: LinearProgressIndicatorProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: linearProgressIndicatorVariants({ tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
