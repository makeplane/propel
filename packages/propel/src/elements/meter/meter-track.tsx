import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { meterTrackVariants } from "./variants";

export type MeterTrackProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled range rail that contains the indicator. Base-UI-agnostic — graft in `components` via
 * `<BaseMeter.Track render={<MeterTrack/>} />`.
 */
export function MeterTrack({ render, ...props }: MeterTrackProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: meterTrackVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
