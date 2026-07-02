import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronsUpDown } from "lucide-react";
import type * as React from "react";

import type { FieldMagnitude } from "../../elements/field/variants";
import {
  SelectIcon,
  SelectItemIndicator,
  SelectLabel,
  SelectTrigger,
  type SelectTriggerMagnitude,
  SelectValue,
} from "../../elements/select/index";
import { ListboxItem } from "../../internal/listbox-item";
import { ListboxPopup } from "../../internal/listbox-popup";
import { Positioner } from "../../internal/positioner";
import { Field, FieldDescription } from "../field";
import { FieldHelperText } from "../field/field-helper-text";
import { Select, type SelectProps } from "../select";

// The field magnitude axis (md/lg/xl) drives label and helper-text size; the select
// trigger/item axis is sm/md/lg, so xl maps onto the largest trigger (lg).
const SELECT_MAGNITUDE: Record<FieldMagnitude, SelectTriggerMagnitude> = {
  md: "md",
  lg: "lg",
  xl: "lg",
};

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
  const selectMagnitude = SELECT_MAGNITUDE[magnitude];
  return (
    <Field name={name} disabled={disabled} invalid={error != null || undefined}>
      <Select disabled={disabled} items={options} {...selectProps}>
        <BaseSelect.Label render={<SelectLabel />}>{label}</BaseSelect.Label>
        <BaseSelect.Trigger render={<SelectTrigger magnitude={selectMagnitude} />}>
          <BaseSelect.Value render={<SelectValue />} />
          <SelectIcon>
            <ChevronsUpDown />
          </SelectIcon>
        </BaseSelect.Trigger>
        {description != null ? (
          <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
        ) : null}
        <BaseSelect.Portal>
          <BaseSelect.Positioner render={<Positioner />}>
            <BaseSelect.Popup render={<ListboxPopup />}>
              <BaseSelect.List>
                {options.map((option) => (
                  <BaseSelect.Item
                    key={option.value}
                    value={option.value}
                    render={<ListboxItem magnitude={selectMagnitude} />}
                  >
                    <BaseSelect.ItemIndicator render={<SelectItemIndicator />}>
                      <Check />
                    </BaseSelect.ItemIndicator>
                    <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </Select>
    </Field>
  );
}
