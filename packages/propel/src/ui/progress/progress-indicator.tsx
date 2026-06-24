import { Progress as BaseProgress } from "@base-ui/react/progress";
import { type VariantProps } from "class-variance-authority";

import { progressIndicatorVariants } from "./variants";

/** Props for {@link ProgressIndicator}; 1:1 with Base UI `Progress.Indicator`. */
export type ProgressIndicatorProps = Omit<BaseProgress.Indicator.Props, "className" | "style"> &
  Required<Pick<VariantProps<typeof progressIndicatorVariants>, "tone">>;

/** 1:1 wrapper around Base UI `Progress.Indicator`. The `tone` drives the fill color. */
export function ProgressIndicator({ tone, ...props }: ProgressIndicatorProps) {
  return <BaseProgress.Indicator className={progressIndicatorVariants({ tone })} {...props} />;
}
