import type * as React from "react";

import { Field } from "../../ui/field/field";
import { FieldHelperText } from "../../ui/field/field-helper-text";
import { FieldLabelGroup } from "../../ui/field/field-label-group";
import { InputFieldContent } from "../../ui/field/input-field-content";
import { TextAreaFieldBox } from "../../ui/field/text-area-field-box";
import {
  TextAreaFieldControl,
  type TextAreaFieldControlProps,
} from "../../ui/field/text-area-field-control";
import type { InputMagnitude, InputTone } from "../../ui/field/variants";

export type TextAreaFieldProps = Omit<TextAreaFieldControlProps, "magnitude" | "surface"> & {
  /** Magnitude scale. `md` | `lg` | `xl`. */
  magnitude: InputMagnitude;
  /** Resting treatment. `neutral` | `danger` (the Figma "error" state). */
  tone: InputTone;
  /** Label text shown above the control. */
  label?: React.ReactNode;
  /** Marks the field required: adds a `*` asterisk and sets `required`. */
  required?: boolean;
  /** Supporting text shown directly below the label. */
  description?: React.ReactNode;
  /** Helper text shown below the control. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /** Error text shown below the control. Overrides `hint`; pair with `tone="danger"`. */
  error?: React.ReactNode;
};

/**
 * Multi-line text field built on Base UI `Field`, rendering the control as a `<textarea>`. Vertical
 * layout only.
 */
export function TextAreaField({
  magnitude,
  tone,
  name,
  label,
  required,
  description,
  hint,
  error,
  disabled,
  ...controlProps
}: TextAreaFieldProps) {
  return (
    <Field name={name} disabled={disabled} invalid={tone === "danger" || undefined}>
      <FieldLabelGroup
        magnitude={magnitude}
        required={required}
        label={label}
        description={description}
        orientation="vertical"
      />
      <InputFieldContent orientation="vertical">
        <TextAreaFieldBox tone={tone}>
          <TextAreaFieldControl
            required={required}
            magnitude={magnitude}
            surface="field"
            {...controlProps}
          />
        </TextAreaFieldBox>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </InputFieldContent>
    </Field>
  );
}
