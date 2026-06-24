import type * as React from "react";

import { Field } from "../../ui/field/field";
import { FieldDescription } from "../../ui/field/field-description";
import { FieldOptionMagnitudeProvider } from "../../ui/field/field-option-magnitude-provider";
import type { FieldMagnitude } from "../../ui/field/variants";
import { Fieldset, FieldsetLegend } from "../../ui/fieldset/index";
import { RadioGroup, type RadioGroupProps } from "../../ui/radio/index";
import { FieldHelperText } from "./field-helper-text";

export type RadioGroupFieldProps<Value = string> = Omit<
  RadioGroupProps<Value>,
  "children" | "density" | "name"
> & {
  /** Radio option rows, usually `RadioGroupFieldOption`. */
  children: React.ReactNode;
  /** Spacing between radio options. */
  density: RadioGroupProps<Value>["density"];
  /** Supporting text shown below the legend. */
  description?: React.ReactNode;
  /** Error text shown below the group. */
  error?: React.ReactNode;
  /** Helper text shown below the group. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /** Visible fieldset legend. */
  label: React.ReactNode;
  /** Legend and helper text size. */
  magnitude: FieldMagnitude;
  /** Submitted field name. */
  name: string;
};

/** Ready-to-use radio group field with legend, description, and helper/error text. */
export function RadioGroupField<Value = string>({
  children,
  density,
  description,
  disabled,
  error,
  hint,
  label,
  magnitude,
  name,
  required,
  ...groupProps
}: RadioGroupFieldProps<Value>) {
  return (
    <Field name={name} disabled={disabled} invalid={error != null || undefined}>
      <Fieldset
        bordered={false}
        render={
          <RadioGroup<Value>
            density={density}
            disabled={disabled}
            required={required}
            {...groupProps}
          />
        }
      >
        <FieldsetLegend magnitude={magnitude}>{label}</FieldsetLegend>
        {description != null ? (
          <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
        ) : null}
        <FieldOptionMagnitudeProvider magnitude={magnitude}>
          {children}
        </FieldOptionMagnitudeProvider>
      </Fieldset>
      <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
    </Field>
  );
}
