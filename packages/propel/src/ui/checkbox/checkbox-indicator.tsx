import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";

import { checkboxIndicatorVariants } from "./variants";

export type CheckboxIndicatorProps = Omit<BaseCheckbox.Indicator.Props, "className" | "style">;

/**
 * The mark shown inside a checked / indeterminate `Checkbox`. Only mounted while checked or
 * indeterminate (no `keepMounted`), so the box is empty when unchecked. Decorative — the Root
 * carries the a11y state. Children — typically a `CheckboxGlyph` — are passed through.
 */
export function CheckboxIndicator(props: CheckboxIndicatorProps) {
  return <BaseCheckbox.Indicator className={checkboxIndicatorVariants()} {...props} />;
}
