import type * as React from "react";

import { InputField as InputFieldElement } from "../../ui/field/input-field";
import { InputFieldContent } from "../../ui/field/input-field-content";
import { InputFieldControl } from "../../ui/field/input-field-control";
import type { InputMagnitude, InputTone } from "../../ui/field/variants";
import type { InputProps } from "../../ui/input/index";
import { InputBox } from "../../ui/input/input-box";
import { InputIconSlot } from "../../ui/input/input-icon-slot";
import { FieldHelperText } from "./field-helper-text";
import { FieldLabelGroup } from "./field-label-group";

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
    <InputFieldElement
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
        <InputBox magnitude={magnitude} tone={tone}>
          {inlineStartNode ? <InputIconSlot>{inlineStartNode}</InputIconSlot> : null}
          <InputFieldControl required={required} magnitude={magnitude} {...controlProps} />
          {inlineEndNode ? <InputIconSlot>{inlineEndNode}</InputIconSlot> : null}
        </InputBox>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </InputFieldContent>
    </InputFieldElement>
  );
}
