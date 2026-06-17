import type * as React from "react";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  type SelectProps,
  SelectTrigger,
  SelectValue,
} from "../select/index";
import { Field } from "./field";
import { FieldDescription } from "./field-description";
import { FieldHelperText } from "./field-helper-text";
import type { FieldMagnitude } from "./field-styles";

export type SelectFieldOption = {
  label: React.ReactNode;
  value: string;
};

export type SelectFieldProps = Omit<SelectProps<string>, "children" | "items"> & {
  /** Supporting text shown below the trigger. */
  description?: React.ReactNode;
  /** Error text shown below the control. */
  error?: React.ReactNode;
  /** Helper text shown below the control. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /** Visible field label. */
  label: React.ReactNode;
  /** Label and helper text size. */
  magnitude: FieldMagnitude;
  /** Options rendered in the popup. */
  options: readonly SelectFieldOption[];
};

/** Ready-to-use select field with label, trigger, popup options, and helper/error text. */
export function SelectField({
  description,
  disabled,
  error,
  hint,
  label,
  magnitude,
  name,
  options,
  ...selectProps
}: SelectFieldProps) {
  return (
    <Field name={name} disabled={disabled} invalid={error != null || undefined}>
      <Select disabled={disabled} items={options} {...selectProps}>
        <SelectLabel>{label}</SelectLabel>
        <SelectTrigger>
          <SelectValue />
          <SelectIcon />
        </SelectTrigger>
        {description != null ? (
          <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
        ) : null}
        <SelectPortal>
          <SelectPositioner>
            <SelectPopup>
              <SelectList>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <SelectItemIndicator />
                    <SelectItemText>{option.label}</SelectItemText>
                  </SelectItem>
                ))}
              </SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </Select>
    </Field>
  );
}
