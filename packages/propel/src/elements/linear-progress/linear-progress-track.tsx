import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type LinearProgressTrackVariantProps, linearProgressTrackVariants } from "./variants";

export type LinearProgressTrackProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
> &
  LinearProgressTrackVariantProps;

/**
 * The styled track (the pill the fill sits inside). `magnitude` drives the thickness (`sm` 5px /
 * `md` 8px). Base-UI-agnostic — graft in `components` via `<BaseProgress.Track
 * render={<LinearProgressTrack/>} />`.
 */
export function LinearProgressTrack({ magnitude, render, ...props }: LinearProgressTrackProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: linearProgressTrackVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
