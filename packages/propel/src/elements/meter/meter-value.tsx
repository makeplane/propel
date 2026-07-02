import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { meterValueVariants } from "./variants";

export type MeterValueProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The styled text element for the formatted current value. Base-UI-agnostic — graft in `components`
 * via `<BaseMeter.Value render={<MeterValue/>} />`.
 */
export function MeterValue({ render, ...props }: MeterValueProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: meterValueVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
