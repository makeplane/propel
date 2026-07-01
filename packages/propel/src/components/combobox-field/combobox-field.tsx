import type * as React from "react";

import {
  Combobox,
  ComboboxClear,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  type ComboboxProps,
  ComboboxTrigger,
} from "../../ui/combobox/index";
import { Field } from "../../ui/field/field";
import { FieldDescription } from "../../ui/field/field-description";
import { FieldLabel } from "../../ui/field/field-label";
import type { FieldMagnitude } from "../../ui/field/variants";
// Ready-made part that supplies a default icon when no children are given (defaults are a `components` concern).
import { ComboboxItemIndicator } from "../combobox/combobox-item-indicator";
import { FieldHelperText } from "../field/field-helper-text";

export type ComboboxFieldProps = Omit<ComboboxProps<string>, "children" | "items"> & {
  /** Supporting text shown below the input. */
  description?: React.ReactNode;
  /**
   * The clear control (e.g. an `IconButton`), rendered as the combobox's clear button. It carries
   * its own — localizable — `aria-label`; the field bakes no label text.
   */
  clear: React.ReactElement;
  /**
   * The popup-trigger control (e.g. an `IconButton`), rendered as the combobox's trigger. It
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

/** Ready-to-use combobox field with label, filter input, popup items, and helper/error text. */
export function ComboboxField({
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
          <ComboboxClear render={clear} />
          <ComboboxTrigger render={trigger} />
        </ComboboxInputGroup>
        {description != null ? (
          <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
        ) : null}
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxEmpty>{empty}</ComboboxEmpty>
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
