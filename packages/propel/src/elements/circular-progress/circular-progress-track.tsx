import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { circularProgressTrackVariants } from "./variants";

/** Props for {@link CircularProgressTrack}. */
export type CircularProgressTrackProps = Omit<
  useRender.ComponentProps<"circle">,
  "className" | "style"
>;

/**
 * The full subtle ring behind the arc (the circular analogue of `ProgressTrack`). Pass the geometry
 * (`cx` / `cy` / `r` / `strokeWidth`) as SVG attributes; the low-emphasis stroke color is baked
 * in.
 */
export function CircularProgressTrack({ render, ...props }: CircularProgressTrackProps) {
  const defaultProps: useRender.ElementProps<"circle"> = {
    className: circularProgressTrackVariants(),
  };
  return useRender({ defaultTagName: "circle", render, props: mergeProps(defaultProps, props) });
}
