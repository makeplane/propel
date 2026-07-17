import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type CircularProgressVariantProps, circularProgressVariants } from "./variants";

export type CircularProgressProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  CircularProgressVariantProps;

/**
 * The styled circular ring box that sizes the ring (`magnitude` `sm` 16px / `md` 20px).
 * Base-UI-agnostic — graft the progress behavior (the `progressbar` role + `aria-valuenow`) in
 * `components` via `<BaseProgress.Root render={<CircularProgress/>} />`. Compose a
 * `CircularProgressSvg` (holding `CircularProgressTrack` + `CircularProgressIndicator`) inside it.
 */
export function CircularProgress({ magnitude, render, ...props }: CircularProgressProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: circularProgressVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
