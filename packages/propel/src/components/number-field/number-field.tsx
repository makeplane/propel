import { Minus, Plus } from "lucide-react";

import {
  NumberField as NumberFieldElement,
  NumberFieldButtonIcon,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  type NumberFieldMagnitude,
  type NumberFieldProps as NumberFieldElementProps,
} from "../../ui/number-field";

export type NumberFieldProps = NumberFieldElementProps & {
  /** Visual size of the field: controls button square and input height. Required. */
  magnitude: NumberFieldMagnitude;
};

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
  magnitude,
  ...props
}: NumberFieldProps) {
  return (
    <NumberFieldElement {...props}>
      <NumberFieldGroup>
        <NumberFieldDecrement magnitude={magnitude} aria-label="Decrease">
          <NumberFieldButtonIcon>
            <Minus />
          </NumberFieldButtonIcon>
        </NumberFieldDecrement>
        {/* The accessible name belongs on the input, not the root div. */}
        <NumberFieldInput
          magnitude={magnitude}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
        />
        <NumberFieldIncrement magnitude={magnitude} aria-label="Increase">
          <NumberFieldButtonIcon>
            <Plus />
          </NumberFieldButtonIcon>
        </NumberFieldIncrement>
      </NumberFieldGroup>
    </NumberFieldElement>
  );
}
