import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import {
  type CircularProgressIndicatorVariantProps,
  circularProgressIndicatorVariants,
} from "./variants";

export type CircularProgressIndicatorProps = Omit<
  useRender.ComponentProps<"circle">,
  "className" | "style"
> &
  CircularProgressIndicatorVariantProps;

/**
 * The toned arc proportional to the value (the circular analogue of `ProgressIndicator`). `tone`
 * drives the stroke color. Pass the geometry (`cx` / `cy` / `r` / `strokeWidth` / `strokeDasharray`
 * / `strokeDashoffset` / `strokeLinecap`) as SVG attributes.
 */
export function CircularProgressIndicator({
  tone,
  render,
  ...props
}: CircularProgressIndicatorProps) {
  const defaultProps: useRender.ElementProps<"circle"> = {
    className: circularProgressIndicatorVariants({ tone }),
  };
  return useRender({ defaultTagName: "circle", render, props: mergeProps(defaultProps, props) });
}
