import type * as React from "react";

import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  type ComboboxProps,
} from "../../ui/combobox/index";
import { Field } from "../../ui/field/field";
import { FieldDescription } from "../../ui/field/field-description";
import { FieldLabel } from "../../ui/field/field-label";
import type { FieldMagnitude } from "../../ui/field/variants";
// Ready-made parts that supply a default icon when no children are given (defaults are a `components` concern).
import { ComboboxClear } from "../combobox/combobox-clear";
import { ComboboxItemIndicator } from "../combobox/combobox-item-indicator";
import { ComboboxTrigger } from "../combobox/combobox-trigger";
import { FieldHelperText } from "../field/field-helper-text";

export type ComboboxFieldProps = Omit<ComboboxProps<string>, "children" | "items"> & {
  /** Supporting text shown below the input. */
  description?: React.ReactNode;
  /** Accessible label used by the clear and popup trigger buttons. */
  controlLabel: string;
  /** Message rendered when no item matches. */
  emptyLabel: React.ReactNode;
  /** Error text shown below the control. */
  error?: React.ReactNode;
  /** Helper text shown below the control. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /** Items rendered in the popup. */
  items: readonly string[];
  /** Visible field label. */
  label: React.ReactNode;
  /** Label and helper text size. */
  magnitude: FieldMagnitude;
  /** Input placeholder. */
  placeholder?: string;
};

/** Ready-to-use combobox field with label, filter input, popup items, and helper/error text. */
export function ComboboxField({
  description,
  controlLabel,
  disabled,
  emptyLabel,
  error,
  hint,
  items,
  label,
  magnitude,
  name,
  placeholder,
  ...comboboxProps
}: ComboboxFieldProps) {
  return (
    <Field name={name} disabled={disabled} invalid={error != null || undefined}>
      <Combobox disabled={disabled} items={items} {...comboboxProps}>
        <FieldLabel magnitude={magnitude} inset={false}>
          {label}
        </FieldLabel>
        <ComboboxInputGroup>
          <ComboboxInput placeholder={placeholder} />
          <ComboboxClear aria-label={`Clear ${controlLabel}`} />
          <ComboboxTrigger aria-label={`Open ${controlLabel}`} />
        </ComboboxInputGroup>
        {description != null ? (
          <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
        ) : null}
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxEmpty>{emptyLabel}</ComboboxEmpty>
              <ComboboxList>
                {items.map((item) => (
                  <ComboboxItem key={item} value={item}>
                    <ComboboxItemIndicator />
                    {item}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </Combobox>
    </Field>
  );
}
