import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";

import { checkboxIndicatorVariants } from "./variants";

export type CheckboxIndicatorProps = Omit<BaseCheckbox.Indicator.Props, "className" | "style">;

/**
 * The CHECK mark shown inside a checked `Checkbox`. A `Checkbox.Indicator` that Base UI mounts
 * while checked or indeterminate (no `keepMounted`), so the box is empty when unchecked; its cva
 * hides it when `data-indeterminate` is present, so the check disappears in the mixed state (the
 * dash takes over). Decorative — the Root carries the a11y state. Children — typically a lucide
 * `Check` — are passed through.
 */
export function CheckboxIndicator(props: CheckboxIndicatorProps) {
  return <BaseCheckbox.Indicator className={checkboxIndicatorVariants()} {...props} />;
}
