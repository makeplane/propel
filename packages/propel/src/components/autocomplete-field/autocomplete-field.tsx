import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

import {
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
} from "../../elements/autocomplete/index";
import type { FieldMagnitude } from "../../elements/field/variants";
import { ListboxItem } from "../../internal/listbox-item";
import { ListboxPopup } from "../../internal/listbox-popup";
import { Positioner } from "../../internal/positioner";
import { Autocomplete, type AutocompleteProps } from "../autocomplete";
import { Field, FieldDescription, FieldLabel } from "../field";
import { FieldHelperText } from "../field/field-helper-text";

export type { FieldMagnitude };

export type AutocompleteFieldProps<Value = string> = Omit<
  AutocompleteProps<Value>,
  "children" | "items"
> & {
  /** Supporting text shown below the input. */
  description?: React.ReactNode;
  /** The clear control (e.g. an `IconButton`) carrying its own localizable `aria-label`. */
  clear: React.ReactElement;
  /** The popup-trigger control (e.g. an `IconButton`) carrying its own localizable `aria-label`. */
  trigger: React.ReactElement;
  /** Message rendered when no item matches. */
  empty: React.ReactNode;
  /** Error text shown below the control. */
  error?: React.ReactNode;
  /** Helper text shown below the control. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /** Items rendered in the popup. */
  items: readonly Value[];
  /** Visible field label. */
  label: React.ReactNode;
  /** Label and helper text size. */
  magnitude: FieldMagnitude;
  /** Input placeholder. */
  placeholder?: string;
};

/** Ready-to-use autocomplete field with label, input, popup items, and helper/error text. */
export function AutocompleteField<Value = string>({
  description,
  clear,
  trigger,
  disabled,
  empty,
  error,
  hint,
  items,
  label,
  magnitude,
  name,
  placeholder,
  ...autocompleteProps
}: AutocompleteFieldProps<Value>) {
  // Base UI's itemToStringValue turns an object item into the input's string; the suggestion rows
  // display the same string.
  const display = (item: Value) =>
    autocompleteProps.itemToStringValue ? autocompleteProps.itemToStringValue(item) : String(item);
  return (
    <Field name={name} disabled={disabled} invalid={error != null || undefined}>
      <Autocomplete disabled={disabled} items={items} {...autocompleteProps}>
        <FieldLabel magnitude={magnitude} inset={false}>
          {label}
        </FieldLabel>
        <BaseAutocomplete.InputGroup render={<AutocompleteInputGroup magnitude={magnitude} />}>
          <BaseAutocomplete.Input
            render={<AutocompleteInput magnitude={magnitude} />}
            placeholder={placeholder}
          />
          <BaseAutocomplete.Clear render={clear} />
          <BaseAutocomplete.Trigger render={trigger} />
        </BaseAutocomplete.InputGroup>
        {description != null ? (
          <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
        ) : null}
        <BaseAutocomplete.Portal>
          <BaseAutocomplete.Positioner render={<Positioner />}>
            <BaseAutocomplete.Popup render={<ListboxPopup />}>
              <BaseAutocomplete.Empty render={<AutocompleteEmpty />}>
                {empty}
              </BaseAutocomplete.Empty>
              <BaseAutocomplete.List>
                {(item: Value) => (
                  <BaseAutocomplete.Item
                    key={display(item)}
                    value={item}
                    render={<ListboxItem layout="plain" magnitude="md" />}
                  >
                    {display(item)}
                  </BaseAutocomplete.Item>
                )}
              </BaseAutocomplete.List>
            </BaseAutocomplete.Popup>
          </BaseAutocomplete.Positioner>
        </BaseAutocomplete.Portal>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </Autocomplete>
    </Field>
  );
}
