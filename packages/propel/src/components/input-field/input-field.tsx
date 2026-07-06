import { Field as BaseField } from "@base-ui/react/field";
import { Input as BaseInput } from "@base-ui/react/input";
import type * as React from "react";

import { FieldControlContent } from "../../elements/field/field-control-content";
import type { InputMagnitude } from "../../elements/field/variants";
import { InputField as InputFieldElement } from "../../elements/input-field/input-field";
import { Input as InputElement } from "../../elements/input/input";
import { InputGroup } from "../../elements/input/input-group";
import { FieldHelperText } from "../field/field-helper-text";
import { FieldLabelGroup } from "../field/field-label-group";

export type { InputMagnitude } from "../../elements/field/variants";

export type InputFieldProps = Omit<
  React.ComponentProps<typeof BaseInput>,
  "className" | "style" | "render"
> & {
  /** Magnitude scale. `md` | `lg` | `xl`. */
  magnitude: InputMagnitude;
  /** Label text shown above (or beside) the control. */
  label?: React.ReactNode;
  /** Marks the field required: adds a `*` asterisk and sets `required`. */
  required?: boolean;
  /** Supporting text shown directly below the label. */
  description?: React.ReactNode;
  /** Helper text shown below the control. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /**
   * Error text shown below the control. Overrides `hint` and marks the field invalid (danger
   * border).
   */
  error?: React.ReactNode;
  /** Label placement: `vertical` (label above) | `horizontal` (label beside). */
  orientation: "vertical" | "horizontal";
  /** Element rendered at the inline start of the control, e.g. `<Icon icon={Search} />`. */
  startIcon?: React.ReactNode;
  /** Element rendered at the inline end of the control, e.g. `<Icon icon={Mail} />`. */
  endIcon?: React.ReactNode;
};

/**
 * Single-line text field built on Base UI `Field`. Supports inline start/end slots and a
 * `horizontal` orientation where the label sits beside the control.
 */
export function InputField({
  magnitude,
  orientation,
  name,
  label,
  required,
  description,
  hint,
  error,
  startIcon,
  endIcon,
  disabled,
  ...controlProps
}: InputFieldProps) {
  return (
    <BaseField.Root
      name={name}
      disabled={disabled}
      invalid={error != null || undefined}
      render={<InputFieldElement orientation={orientation} />}
    >
      <FieldLabelGroup
        magnitude={magnitude}
        required={required}
        label={label}
        description={description}
        orientation={orientation}
      />
      <FieldControlContent orientation={orientation}>
        <InputGroup magnitude={magnitude}>
          {startIcon}
          <BaseInput
            required={required}
            {...controlProps}
            render={<InputElement magnitude={magnitude} />}
          />
          {endIcon}
        </InputGroup>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </FieldControlContent>
    </BaseField.Root>
  );
}
