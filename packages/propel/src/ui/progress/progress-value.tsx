import { Progress as BaseProgress } from "@base-ui/react/progress";
import { type VariantProps } from "class-variance-authority";

import { progressValueVariants } from "./variants";

/** Props for {@link ProgressValue}; 1:1 with Base UI `Progress.Value`. */
export type ProgressValueProps = Omit<BaseProgress.Value.Props, "className" | "style"> &
  Required<Pick<VariantProps<typeof progressValueVariants>, "tone">>;

/**
 * 1:1 wrapper around Base UI `Progress.Value`. The `tone` keeps the text in the same hue as the
 * fill.
 */
export function ProgressValue({ tone, ...props }: ProgressValueProps) {
  return <BaseProgress.Value className={progressValueVariants({ tone })} {...props} />;
}
