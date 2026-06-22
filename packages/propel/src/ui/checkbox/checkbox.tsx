import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";

import { checkboxVariants, type CheckboxTone } from "./variants";

export type { CheckboxTone } from "./variants";

export type CheckboxProps = Omit<BaseCheckbox.Root.Props, "className" | "style"> & {
  /** Resting color of the box. `danger` is the Figma "Error" state. */
  tone: CheckboxTone;
};

/**
 * The checkbox box: a styled `BaseCheckbox.Root`. Base UI renders a real checkbox with
 * `aria-checked` (including `mixed` for indeterminate). Children — typically a `CheckboxIndicator`
 * — are passed through. Give it an accessible name with `aria-label`/`aria-labelledby`, or pair it
 * with a `<label htmlFor>`.
 */
export function Checkbox({ tone, ...props }: CheckboxProps) {
  return <BaseCheckbox.Root className={checkboxVariants({ tone })} {...props} />;
}
