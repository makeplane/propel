import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import { ComboboxEmpty, ComboboxInput, ComboboxInputGroup } from "../../elements/combobox/index";
import type { FieldMagnitude } from "../../elements/field/variants";
import { ListboxItem } from "../../internal/listbox-item";
import { ListboxPopup } from "../../internal/listbox-popup";
import { Positioner } from "../../internal/positioner";
import { Combobox, type ComboboxProps } from "../combobox";
// Ready-made part that supplies a default icon when no children are given (defaults are a `components` concern).
import { ComboboxItemIndicator } from "../combobox/combobox-item-indicator";
import { Field, FieldDescription, FieldLabel } from "../field";
import { FieldHelperText } from "../field/field-helper-text";

export type ComboboxFieldProps<Value = string> = Omit<
  ComboboxProps<Value>,
  "children" | "items"
> & {
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
  items: readonly Value[];
  /** Visible field label. */
  label: string;
  /** Label and helper text size. */
  magnitude: FieldMagnitude;
  /** Input placeholder. */
  placeholder?: string;
};

/** Ready-to-use combobox field with label, filter input, popup items, and helper/error text. */
export function ComboboxField<Value = string>({
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
}: ComboboxFieldProps<Value>) {
  // Base UI's itemToStringLabel names an object item; the rows display the same string.
  const display = (item: Value) =>
    comboboxProps.itemToStringLabel ? comboboxProps.itemToStringLabel(item) : String(item);
  return (
    <Field name={name} disabled={disabled} invalid={error != null || undefined}>
      <Combobox disabled={disabled} items={items} {...comboboxProps}>
        <FieldLabel magnitude={magnitude} inset={false}>
          {label}
        </FieldLabel>
        <BaseCombobox.InputGroup render={<ComboboxInputGroup magnitude={magnitude} />}>
          <BaseCombobox.Input render={<ComboboxInput />} placeholder={placeholder} />
          <BaseCombobox.Clear render={clear} />
          <BaseCombobox.Trigger render={trigger} />
        </BaseCombobox.InputGroup>
        {description != null ? (
          <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
        ) : null}
        <BaseCombobox.Portal>
          <BaseCombobox.Positioner render={<Positioner />}>
            <BaseCombobox.Popup render={<ListboxPopup />}>
              <BaseCombobox.Empty render={<ComboboxEmpty />}>{empty}</BaseCombobox.Empty>
              <BaseCombobox.List>
                {(item: Value) => (
                  <BaseCombobox.Item
                    key={display(item)}
                    value={item}
                    render={<ListboxItem layout="indicator" magnitude="md" />}
                  >
                    <ComboboxItemIndicator />
                    {display(item)}
                  </BaseCombobox.Item>
                )}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </Combobox>
    </Field>
  );
}
