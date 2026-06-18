import { Minus, Plus } from "lucide-react";

import {
  NumberField as NumberFieldRoot,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  type NumberFieldProps as NumberFieldRootProps,
} from "../../ui/number-field";

export type NumberFieldProps = NumberFieldRootProps;

/**
 * The ready-made number field: a numeric input flanked by decrement / increment buttons. Drive it
 * with `value`/`defaultValue` + `onValueChange`, bound it with `min`/`max`/`step`, and pass
 * `format` (an `Intl.NumberFormatOptions`) to format the displayed value.
 *
 * Composed from the `ui/number-field` parts (`NumberField` root + `NumberFieldGroup` +
 * `NumberFieldDecrement` + `NumberFieldInput` + `NumberFieldIncrement`), which are built on Base UI
 * `NumberField`.
 */
export function NumberField({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...props
}: NumberFieldProps) {
  return (
    <NumberFieldRoot {...props}>
      <NumberFieldGroup>
        <NumberFieldDecrement aria-label="Decrease">
          <Minus aria-hidden className="size-4" />
        </NumberFieldDecrement>
        {/* The accessible name belongs on the input, not the root div. */}
        <NumberFieldInput aria-label={ariaLabel} aria-labelledby={ariaLabelledby} />
        <NumberFieldIncrement aria-label="Increase">
          <Plus aria-hidden className="size-4" />
        </NumberFieldIncrement>
      </NumberFieldGroup>
    </NumberFieldRoot>
  );
}
