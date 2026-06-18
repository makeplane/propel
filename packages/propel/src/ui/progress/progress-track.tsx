import { Progress as BaseProgress } from "@base-ui/react/progress";
import { type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { trackVariants } from "./variants";

/** Props for {@link ProgressTrack}; 1:1 with Base UI `Progress.Track`. */
export type ProgressTrackProps = Omit<
  React.ComponentProps<typeof BaseProgress.Track>,
  "className" | "style"
> &
  VariantProps<typeof trackVariants>;

/**
 * 1:1 wrapper around Base UI `Progress.Track`. `magnitude` drives the track thickness (`sm` 5px /
 * `md` 8px).
 */
export function ProgressTrack({ magnitude, ...props }: ProgressTrackProps) {
  return <BaseProgress.Track className={trackVariants({ magnitude })} {...props} />;
}
