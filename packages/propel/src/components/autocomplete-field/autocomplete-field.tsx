import type * as React from "react";

import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  type AutocompleteProps,
} from "../../ui/autocomplete/index";
import { Field } from "../../ui/field/field";
import { FieldDescription } from "../../ui/field/field-description";
import { FieldLabel } from "../../ui/field/field-label";
import type { FieldMagnitude } from "../../ui/field/variants";
import { AutocompleteClear } from "../autocomplete/autocomplete-clear";
import { AutocompleteTrigger } from "../autocomplete/autocomplete-trigger";
import { FieldHelperText } from "../field/field-helper-text";

export type AutocompleteFieldProps = Omit<AutocompleteProps<string>, "children" | "items"> & {
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

/** Ready-to-use autocomplete field with label, input, popup items, and helper/error text. */
export function AutocompleteField({
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
  ...autocompleteProps
}: AutocompleteFieldProps) {
  return (
    <Field name={name} disabled={disabled} invalid={error != null || undefined}>
      <Autocomplete disabled={disabled} items={items} {...autocompleteProps}>
        <FieldLabel magnitude={magnitude} inset={false}>
          {label}
        </FieldLabel>
        <AutocompleteInputGroup>
          <AutocompleteInput placeholder={placeholder} />
          <AutocompleteClear aria-label={`Clear ${controlLabel}`} />
          <AutocompleteTrigger aria-label={`Open ${controlLabel}`} />
        </AutocompleteInputGroup>
        {description != null ? (
          <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
        ) : null}
        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty>{emptyLabel}</AutocompleteEmpty>
              <AutocompleteList>
                {items.map((item) => (
                  <AutocompleteItem key={item} value={item}>
                    {item}
                  </AutocompleteItem>
                ))}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </Autocomplete>
    </Field>
  );
}
