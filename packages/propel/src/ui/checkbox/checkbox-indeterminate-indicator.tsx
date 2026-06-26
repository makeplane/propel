import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";

import { checkboxIndeterminateIndicatorVariants } from "./variants";

export type CheckboxIndeterminateIndicatorProps = Omit<
  BaseCheckbox.Indicator.Props,
  "className" | "style"
>;

/**
 * The dash shown while a `Checkbox` is indeterminate. A second `Checkbox.Indicator` that Base UI
 * mounts when checked or indeterminate; its cva keeps it hidden unless `data-indeterminate` is
 * present, so only the dash (not the check) shows in the mixed state. Decorative — the Root carries
 * a11y. Children — typically a lucide `Minus` — pass through.
 */
export function CheckboxIndeterminateIndicator(props: CheckboxIndeterminateIndicatorProps) {
  return <BaseCheckbox.Indicator className={checkboxIndeterminateIndicatorVariants()} {...props} />;
}
