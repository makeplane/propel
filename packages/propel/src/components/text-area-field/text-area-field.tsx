import type * as React from "react";

import { FieldControlContent } from "../../elements/field/field-control-content";
import type { InputMagnitude } from "../../elements/field/variants";
import { TextAreaGroup } from "../../elements/text-area/text-area-group";
import { Field } from "../field";
import { FieldHelperText } from "../field/field-helper-text";
import { FieldLabelGroup } from "../field/field-label-group";
import { TextArea, type TextAreaProps } from "../text-area";

export type { InputMagnitude };

export type TextAreaFieldProps = Omit<TextAreaProps, "magnitude" | "surface"> & {
  /** Magnitude scale. `md` | `lg` | `xl`. */
  magnitude: InputMagnitude;
  /** Label text shown above the control. */
  label?: string;
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
};

/**
 * Multi-line text field built on Base UI `Field`, rendering the control as a `<textarea>`. Vertical
 * layout only.
 */
export function TextAreaField({
  magnitude,
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
    <Field name={name} disabled={disabled} invalid={error != null || undefined}>
      <FieldLabelGroup
        magnitude={magnitude}
        required={required}
        label={label}
        description={description}
        orientation="vertical"
      />
      <FieldControlContent orientation="vertical">
        <TextAreaGroup>
          <TextArea required={required} magnitude={magnitude} surface="field" {...controlProps} />
        </TextAreaGroup>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </FieldControlContent>
    </Field>
  );
}
