import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type * as React from "react";

import {
  NumberField as NumberFieldElement,
  NumberFieldGroup,
  NumberFieldInput,
  type NumberFieldMagnitude,
} from "../../elements/number-field";

export type NumberFieldProps = Omit<
  BaseNumberField.Root.Props,
  "className" | "style" | "render"
> & {
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
 * Grafts Base UI `NumberField` behavior onto the `elements/number-field` styled parts
 * (`NumberField` root + `NumberFieldGroup` + `NumberFieldInput`) via `render`. The
 * `decrement`/`increment` steppers are consumer-provided controls, grafted onto Base UI's
 * `Decrement`/`Increment` behavior.
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
    <BaseNumberField.Root {...props} render={<NumberFieldElement />}>
      <BaseNumberField.Group render={<NumberFieldGroup />}>
        <BaseNumberField.Decrement render={decrement} />
        {/* The accessible name belongs on the input, not the root div. */}
        <BaseNumberField.Input
          render={
            <NumberFieldInput
              magnitude={magnitude}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledby}
            />
          }
        />
        <BaseNumberField.Increment render={increment} />
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
