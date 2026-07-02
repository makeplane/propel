import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { meterLabelVariants } from "./variants";

export type MeterLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The styled meter label text. Base-UI-agnostic — graft in `components` via `<BaseMeter.Label
 * render={<MeterLabel/>} />`.
 */
export function MeterLabel({ render, ...props }: MeterLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: meterLabelVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
