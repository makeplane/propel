import type * as React from "react";

import { CheckboxGroup, type CheckboxGroupProps } from "../checkbox-group/index";
import { Fieldset, FieldsetLegend } from "../fieldset/index";
import { Field } from "./field";
import { FieldDescription } from "./field-description";
import { FieldHelperText } from "./field-helper-text";
import { FieldOptionMagnitudeProvider } from "./field-option-magnitude-provider";
import type { FieldMagnitude } from "./field-styles";

export type CheckboxGroupFieldProps = Omit<CheckboxGroupProps, "children" | "density" | "name"> & {
  /** Checkbox option rows, usually `CheckboxGroupFieldOption`. */
  children: React.ReactNode;
  /** Spacing between checkbox options. */
  density: CheckboxGroupProps["density"];
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

/** Ready-to-use checkbox group field with legend, description, and helper/error text. */
export function CheckboxGroupField({
  children,
  density,
  description,
  disabled,
  error,
  hint,
  label,
  magnitude,
  name,
  ...groupProps
}: CheckboxGroupFieldProps) {
  return (
    <Field name={name} disabled={disabled} invalid={error != null || undefined}>
      <Fieldset render={<CheckboxGroup density={density} disabled={disabled} {...groupProps} />}>
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
