import { Progress as BaseProgress } from "@base-ui/react/progress";
import { type VariantProps } from "class-variance-authority";

import { progressTrackVariants } from "./variants";

/** Props for {@link ProgressTrack}; 1:1 with Base UI `Progress.Track`. */
export type ProgressTrackProps = Omit<BaseProgress.Track.Props, "className" | "style"> &
  VariantProps<typeof progressTrackVariants>;

/**
 * 1:1 wrapper around Base UI `Progress.Track`. `magnitude` drives the track thickness (`sm` 5px /
 * `md` 8px).
 */
export function ProgressTrack({ magnitude, ...props }: ProgressTrackProps) {
  return <BaseProgress.Track className={progressTrackVariants({ magnitude })} {...props} />;
}
