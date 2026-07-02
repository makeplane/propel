import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { checkboxIndeterminateIndicatorVariants } from "./variants";

export type CheckboxIndeterminateIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The dash shown while a `Checkbox` is indeterminate. Graft in `components` via a second
 * `<BaseCheckbox.Indicator render={<CheckboxIndeterminateIndicator/>} />`; Base UI mounts it when
 * checked or indeterminate and its cva keeps it hidden unless `data-indeterminate` is present, so
 * only the dash (not the check) shows in the mixed state. Decorative — the box carries a11y.
 * Children — typically a lucide `Minus` — pass through.
 */
export function CheckboxIndeterminateIndicator({
  render,
  ...props
}: CheckboxIndeterminateIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: checkboxIndeterminateIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
