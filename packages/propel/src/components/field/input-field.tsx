import type * as React from "react";

import { FieldLabelGroup } from "../../ui/field/field-label-group";
import { InputFieldBox } from "../../ui/field/input-field-box";
import { InputFieldContent } from "../../ui/field/input-field-content";
import { InputFieldControl } from "../../ui/field/input-field-control";
import { InputFieldIconSlot } from "../../ui/field/input-field-icon-slot";
import { InputFieldRoot } from "../../ui/field/input-field-root";
import type { InputMagnitude, InputTone } from "../../ui/field/variants";
import type { InputProps } from "../../ui/input/index";
import { FieldHelperText } from "./field-helper-text";

export type { InputMagnitude, InputTone } from "../../ui/field/variants";

export type InputFieldProps = Omit<InputProps, "magnitude"> & {
  /** Magnitude scale. `md` | `lg` | `xl`. */
  magnitude: InputMagnitude;
  /** Resting treatment. `neutral` | `danger` (the Figma "error" state). */
  tone: InputTone;
  /** Label text shown above (or beside) the control. */
  label?: React.ReactNode;
  /** Marks the field required: adds a `*` asterisk and sets `required`. */
  required?: boolean;
  /** Supporting text shown directly below the label. */
  description?: React.ReactNode;
  /** Helper text shown below the control. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /** Error text shown below the control. Overrides `hint`; pair with `tone="danger"`. */
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
  tone,
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
    <InputFieldRoot
      name={name}
      disabled={disabled}
      invalid={tone === "danger" || undefined}
      orientation={orientation}
    >
      <FieldLabelGroup
        magnitude={magnitude}
        required={required}
        label={label}
        description={description}
        orientation={orientation}
      />
      <InputFieldContent orientation={orientation}>
        <InputFieldBox magnitude={magnitude} tone={tone}>
          {inlineStartNode ? <InputFieldIconSlot>{inlineStartNode}</InputFieldIconSlot> : null}
          <InputFieldControl required={required} magnitude={magnitude} {...controlProps} />
          {inlineEndNode ? <InputFieldIconSlot>{inlineEndNode}</InputFieldIconSlot> : null}
        </InputFieldBox>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </InputFieldContent>
    </InputFieldRoot>
  );
}
