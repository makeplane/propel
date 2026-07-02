import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { checkboxIndicatorVariants } from "./variants";

export type CheckboxIndicatorProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The CHECK mark shown inside a checked `Checkbox`. Graft in `components` via
 * `<BaseCheckbox.Indicator render={<CheckboxIndicator/>} />` — Base UI mounts it only while checked
 * or indeterminate (no `keepMounted`), so the box is empty when unchecked; its cva hides it when
 * `data-indeterminate` is present, so the check disappears in the mixed state (the dash takes
 * over). Decorative — the box carries the a11y state. Children — typically a lucide `Check` — pass
 * through.
 */
export function CheckboxIndicator({ render, ...props }: CheckboxIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: checkboxIndicatorVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
