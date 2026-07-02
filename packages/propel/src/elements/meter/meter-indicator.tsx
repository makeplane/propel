import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type MeterIndicatorVariantProps, meterIndicatorVariants } from "./variants";

export type { MeterIndicatorLevel } from "./variants";

export type MeterIndicatorProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  MeterIndicatorVariantProps;

/**
 * The styled filled portion of the track, colored by `level`. Base UI sets its `width` inline from
 * the meter value; we own only the fill color and the width transition. Base-UI-agnostic — graft in
 * `components` via `<BaseMeter.Indicator render={<MeterIndicator level={…}/>} />`.
 */
export function MeterIndicator({ level, render, ...props }: MeterIndicatorProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: meterIndicatorVariants({ level }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
