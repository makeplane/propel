import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { fieldsetBodyVariants } from "./variants";

export type FieldsetBodyProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The body region of a `Fieldset`: stacks the group's contained fields with the consistent vertical
 * gap the design spec calls for. Sits below the legend (and optional description).
 */
export function FieldsetBody({ render, ...props }: FieldsetBodyProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: fieldsetBodyVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
