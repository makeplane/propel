import type * as React from "react";

import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  type AutocompleteProps,
  AutocompleteTrigger,
} from "../../ui/autocomplete/index";
import { Field } from "../../ui/field/field";
import { FieldDescription } from "../../ui/field/field-description";
import { FieldLabel } from "../../ui/field/field-label";
import type { FieldMagnitude } from "../../ui/field/variants";
import { FieldHelperText } from "../field/field-helper-text";

export type AutocompleteFieldProps = Omit<AutocompleteProps<string>, "children" | "items"> & {
  /** Supporting text shown below the input. */
  description?: React.ReactNode;
  /**
   * The clear control (e.g. an `IconButton`), rendered as the autocomplete's clear button. It
   * carries its own — localizable — `aria-label`; the field bakes no label text.
   */
  clear: React.ReactElement;
  /**
   * The popup-trigger control (e.g. an `IconButton`), rendered as the autocomplete's trigger. It
   * carries its own — localizable — `aria-label`; the field bakes no label text.
   */
  trigger: React.ReactElement;
  /** Message rendered when no item matches. */
  empty: React.ReactNode;
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
}: AutocompleteFieldProps) {
  return (
    <Field name={name} disabled={disabled} invalid={error != null || undefined}>
      <Autocomplete disabled={disabled} items={items} {...autocompleteProps}>
        <FieldLabel magnitude={magnitude} inset={false}>
          {label}
        </FieldLabel>
        {/* The field's magnitude sizes its label/text; the control keeps the standard lg (36px)
            box height (search magnitude scale sm/md/lg ≠ the field's md/lg/xl). */}
        <AutocompleteInputGroup magnitude="lg">
          <AutocompleteInput magnitude="lg" placeholder={placeholder} />
          <AutocompleteClear render={clear} />
          <AutocompleteTrigger render={trigger} />
        </AutocompleteInputGroup>
        {description != null ? (
          <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
        ) : null}
        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty>{empty}</AutocompleteEmpty>
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
