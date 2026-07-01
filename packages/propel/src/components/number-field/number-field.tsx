import type * as React from "react";

import {
  NumberField as NumberFieldElement,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  type NumberFieldMagnitude,
  type NumberFieldProps as NumberFieldElementProps,
} from "../../ui/number-field";

export type NumberFieldProps = NumberFieldElementProps & {
  /** Visual size of the field: controls the input height. Required. */
  magnitude: NumberFieldMagnitude;
  /**
   * The decrement control (e.g. an `IconButton`), rendered as the field's decrement stepper. It
   * carries its own — localizable — `aria-label`; the field bakes no label or glyph.
   */
  decrement: React.ReactElement;
  /**
   * The increment control (e.g. an `IconButton`), rendered as the field's increment stepper. It
   * carries its own — localizable — `aria-label`; the field bakes no label or glyph.
   */
  increment: React.ReactElement;
};

/**
 * The ready-made number field: a numeric input flanked by decrement / increment buttons. Drive it
 * with `value`/`defaultValue` + `onValueChange`, bound it with `min`/`max`/`step`, and pass
 * `format` (an `Intl.NumberFormatOptions`) to format the displayed value.
 *
 * Composed from the `ui/number-field` parts (`NumberField` root + `NumberFieldGroup` +
 * `NumberFieldDecrement` + `NumberFieldInput` + `NumberFieldIncrement`), which are built on Base UI
 * `NumberField`. The `decrement`/`increment` steppers are consumer-provided controls, grafted onto
 * the behavior wrappers via `render`.
 */
export function NumberField({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  magnitude,
  decrement,
  increment,
  ...props
}: NumberFieldProps) {
  return (
    <NumberFieldElement {...props}>
      <NumberFieldGroup>
        <NumberFieldDecrement render={decrement} />
        {/* The accessible name belongs on the input, not the root div. */}
        <NumberFieldInput
          magnitude={magnitude}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
        />
        <NumberFieldIncrement render={increment} />
      </NumberFieldGroup>
    </NumberFieldElement>
  );
}
