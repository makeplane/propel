import { Select as BaseSelect } from "@base-ui/react/select";
import { Check } from "lucide-react";
import type * as React from "react";

import type { FieldMagnitude } from "../../elements/field/variants";
import {
  SelectItemIndicator,
  type SelectTriggerMagnitude,
} from "../../elements/select/index";
import { ListboxItem } from "../../internal/listbox-item";
import { ListboxPopup } from "../../internal/listbox-popup";
import { Positioner } from "../../internal/positioner";
import { Field, FieldDescription, FieldLabel } from "../field";
import { FieldHelperText } from "../field/field-helper-text";
import { Select, SelectTrigger, type SelectProps } from "../select";

export type { FieldMagnitude } from "../../elements/field/variants";

// The field magnitude axis (md/lg/xl) drives label and helper-text size; the select
// trigger/item axis is sm/md/lg, so xl maps onto the largest trigger (lg).
const SELECT_MAGNITUDE: Record<FieldMagnitude, SelectTriggerMagnitude> = {
  md: "md",
  lg: "lg",
  xl: "lg",
};

export type SelectFieldOption = {
  label: string;
  value: string;
};

export type SelectFieldProps = Omit<SelectProps<string>, "children" | "items"> & {
  /** Supporting text shown below the trigger. Replaced by `error` when an error is set. */
  description?: React.ReactNode;
  /** Error text shown below the control. */
  error?: React.ReactNode;
  /** Helper text shown below the control. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /** Visible field label. */
  label: string;
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
        {/* Use the shared `FieldLabel` (magnitude-scaled: md=text-13) so the select field's label
            matches the other field labels — the picker's own fixed-`text-14` `SelectLabel` made it a
            step too large next to Input/Radio/Checkbox in a form. `Field.Root` still associates it
            with the trigger. */}
        <FieldLabel magnitude={magnitude} inset={false}>
          {label}
        </FieldLabel>
        <SelectTrigger magnitude={selectMagnitude} />
        {error == null && description != null ? (
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
                    render={<ListboxItem layout="indicator" magnitude={selectMagnitude} />}
                  >
                    <BaseSelect.ItemIndicator keepMounted render={<SelectItemIndicator />}>
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
