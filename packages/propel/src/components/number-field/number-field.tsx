import { Minus, Plus } from "lucide-react";

import {
  NumberField as NumberFieldElement,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  type NumberFieldMagnitude,
  type NumberFieldProps as NumberFieldElementProps,
} from "../../ui/number-field";
import { IconButton } from "../icon-button";

export type NumberFieldProps = NumberFieldElementProps & {
  /** Visual size of the field: controls button square and input height. Required. */
  magnitude: NumberFieldMagnitude;
  /** Accessible name for the decrement button. */
  decrementLabel: string;
  /** Accessible name for the increment button. */
  incrementLabel: string;
};

/**
 * The ready-made number field: a numeric input flanked by decrement / increment buttons. Drive it
 * with `value`/`defaultValue` + `onValueChange`, bound it with `min`/`max`/`step`, and pass
 * `format` (an `Intl.NumberFormatOptions`) to format the displayed value.
 *
 * Composed from the `ui/number-field` parts (`NumberField` root + `NumberFieldGroup` +
 * `NumberFieldDecrement` + `NumberFieldInput` + `NumberFieldIncrement`), which are built on Base UI
 * `NumberField`. The steppers render as ghost `IconButton`s via the behavior wrappers' `render`.
 */
export function NumberField({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  magnitude,
  decrementLabel,
  incrementLabel,
  ...props
}: NumberFieldProps) {
  return (
    <NumberFieldElement {...props}>
      <NumberFieldGroup>
        <NumberFieldDecrement
          render={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude={magnitude}
              aria-label={decrementLabel}
            >
              <Minus />
            </IconButton>
          }
        />
        {/* The accessible name belongs on the input, not the root div. */}
        <NumberFieldInput
          magnitude={magnitude}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
        />
        <NumberFieldIncrement
          render={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude={magnitude}
              aria-label={incrementLabel}
            >
              <Plus />
            </IconButton>
          }
        />
      </NumberFieldGroup>
    </NumberFieldElement>
  );
}
