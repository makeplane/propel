import type * as React from "react";

import { FieldControlContent } from "../../ui/field/field-control-content";
import type { InputMagnitude } from "../../ui/field/variants";
import { InputField as InputFieldElement } from "../../ui/input-field/input-field";
import type { InputProps } from "../../ui/input/index";
import { Input } from "../../ui/input/input";
import { InputBox } from "../../ui/input/input-box";
import { InputIconSlot } from "../../ui/input/input-icon-slot";
import { FieldHelperText } from "../field/field-helper-text";
import { FieldLabelGroup } from "../field/field-label-group";

export type { InputMagnitude } from "../../ui/field/variants";

export type InputFieldProps = Omit<InputProps, "magnitude"> & {
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
  /** A 16px node rendered at the inline start of the control. */
  inlineStartNode?: React.ReactNode;
  /** A 16px node rendered at the inline end of the control. */
  inlineEndNode?: React.ReactNode;
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
  inlineStartNode,
  inlineEndNode,
  disabled,
  ...controlProps
}: InputFieldProps) {
  return (
    <InputFieldElement
      name={name}
      disabled={disabled}
      invalid={error != null || undefined}
      orientation={orientation}
    >
      <FieldLabelGroup
        magnitude={magnitude}
        required={required}
        label={label}
        description={description}
        orientation={orientation}
      />
      <FieldControlContent orientation={orientation}>
        <InputBox magnitude={magnitude}>
          {inlineStartNode ? <InputIconSlot>{inlineStartNode}</InputIconSlot> : null}
          <Input required={required} magnitude={magnitude} {...controlProps} />
          {inlineEndNode ? <InputIconSlot>{inlineEndNode}</InputIconSlot> : null}
        </InputBox>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </FieldControlContent>
    </InputFieldElement>
  );
}
