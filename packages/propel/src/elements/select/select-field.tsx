import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { selectFieldVariants } from "./variants";

export type SelectFieldProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The field region that stacks a `SelectLabel` over a `SelectTrigger` as a column. Layout-only — it
 * owns the gap between the label and the trigger so neither part carries raw spacing.
 */
export function SelectField({ render, ...props }: SelectFieldProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: selectFieldVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
