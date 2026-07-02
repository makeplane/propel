import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { meterVariants } from "./variants";

export type MeterProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled meter root: a vertical stack holding the header row and the track. Base-UI-agnostic —
 * graft the meter behavior in `components` via `<BaseMeter.Root render={<Meter/>} value={…} />` (it
 * owns the `meter` role + `aria-valuenow`).
 */
export function Meter({ render, ...props }: MeterProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: meterVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
