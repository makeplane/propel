import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { circularProgressSvgVariants } from "./variants";

export type CircularProgressSvgProps = Omit<useRender.ComponentProps<"svg">, "className" | "style">;

/**
 * The SVG viewport of the circular ring. Fills its `CircularProgress` box and holds the
 * `CircularProgressTrack` + `CircularProgressIndicator` circles. Decorative (the `CircularProgress`
 * root carries the `progressbar` a11y), so it is `aria-hidden`. Pass a `viewBox` matching the ring
 * box so one SVG user unit equals one pixel.
 */
export function CircularProgressSvg({ render, ...props }: CircularProgressSvgProps) {
  const defaultProps: useRender.ElementProps<"svg"> = {
    "aria-hidden": "true",
    fill: "none",
    className: circularProgressSvgVariants(),
  };
  return useRender({ defaultTagName: "svg", render, props: mergeProps(defaultProps, props) });
}
