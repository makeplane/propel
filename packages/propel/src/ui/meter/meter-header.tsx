import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { meterHeaderVariants } from "./variants";

export type MeterHeaderProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The row above the track that pairs a `MeterLabel` (inline-start) with a `MeterValue`
 * (inline-end). An anatomy extension beyond Base UI's `Meter` parts: it owns the label/value layout
 * so the components tier composes parts without raw class names.
 */
export function MeterHeader({ render, ...props }: MeterHeaderProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: meterHeaderVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
