import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";

import { checkboxVariants, type CheckboxVariantProps } from "./variants";

export type CheckboxProps = Omit<BaseCheckbox.Root.Props, "className" | "style"> &
  CheckboxVariantProps;

/**
 * The checkbox box: a styled `BaseCheckbox.Root`. Base UI renders a real checkbox with
 * `aria-checked` (including `mixed` for indeterminate). Children — typically a `CheckboxIndicator`
 * — are passed through. Give it an accessible name with `aria-label`/`aria-labelledby`, or pair it
 * with a `<label htmlFor>`. The danger look is a STATE, not a prop: inside an invalid `Field.Root`,
 * Base UI propagates `data-invalid` here and the box recolors its border to `danger`.
 */
export function Checkbox(props: CheckboxProps) {
  return <BaseCheckbox.Root className={checkboxVariants()} {...props} />;
}
