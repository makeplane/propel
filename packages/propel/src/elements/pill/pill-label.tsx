import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { pillLabelVariants } from "./variants";

export type PillLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** The pill's single-line label. Shrinks and truncates instead of wrapping. */
export function PillLabel({ render, ...props }: PillLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: pillLabelVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
