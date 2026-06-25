import { Progress as BaseProgress } from "@base-ui/react/progress";

import { type LinearProgressTrackVariantProps, linearProgressTrackVariants } from "./variants";

export type { LinearProgressTrackVariantProps } from "./variants";

/** Props for {@link LinearProgressTrack}; 1:1 with Base UI `LinearProgress.Track`. */
export type LinearProgressTrackProps = Omit<BaseProgress.Track.Props, "className" | "style"> &
  LinearProgressTrackVariantProps;

/**
 * 1:1 wrapper around Base UI `LinearProgress.Track`. `magnitude` drives the track thickness (`sm`
 * 5px / `md` 8px).
 */
export function LinearProgressTrack({ magnitude, ...props }: LinearProgressTrackProps) {
  return <BaseProgress.Track className={linearProgressTrackVariants({ magnitude })} {...props} />;
}
