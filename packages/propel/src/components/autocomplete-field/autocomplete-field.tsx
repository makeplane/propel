import { ChevronsUpDown, X } from "lucide-react";
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
import { IconButton } from "../icon-button";

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
        {/* The field's magnitude sizes its label/text; the control keeps the standard lg (36px)
            box height (search magnitude scale sm/md/lg ≠ the field's md/lg/xl). */}
        <AutocompleteInputGroup magnitude="lg">
          <AutocompleteInput magnitude="lg" placeholder={placeholder} />
          <AutocompleteClear
            render={
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="md"
                aria-label={`Clear ${controlLabel}`}
              >
                <X />
              </IconButton>
            }
          />
          <AutocompleteTrigger
            render={
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="md"
                aria-label={`Open ${controlLabel}`}
              >
                <ChevronsUpDown />
              </IconButton>
            }
          />
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
