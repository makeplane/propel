import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { X } from "lucide-react";

import {
  type ComboboxMagnitude,
  ComboboxChip as ComboboxChipElement,
  ComboboxChipRemove as ComboboxChipRemoveElement,
  ComboboxChips as ComboboxChipsElement,
  ComboboxInput as ComboboxInputElement,
} from "../../elements/combobox";

export type ComboboxChipsProps<Value = string> = {
  /** Visual size of the chips frame: height, text, and glyph sizing. Required. */
  magnitude: ComboboxMagnitude;
  /** Input placeholder shown while typing to add another value. */
  placeholder?: string;
  /**
   * Accessible name for a value's chip-remove button (e.g. `` (item) => `Remove ${item.label}` ``).
   * Localizable, so it is required — the frame bakes no label text.
   */
  removeLabel: (item: Value) => string;
  /**
   * A selected item's display text — Base UI's `itemToStringLabel`. For object values, pass the
   * same function you give the `Combobox` root; defaults to `String(item)`.
   */
  itemToStringLabel?: (item: Value) => string;
};

/**
 * The ready-made multiselect input frame — it replaces `ComboboxInputGroup` in the `multiple`
 * anatomy. Grafts Base UI's `Chips` behavior onto the styled `elements/combobox` frame and maps
 * each selected value to a removable chip (label + X remove button) ahead of the inline input,
 * wrapping onto new rows as the selection grows. Arrow keys move focus across chips; Backspace
 * removes.
 */
export function ComboboxChips<Value = string>({
  magnitude,
  placeholder,
  removeLabel,
  itemToStringLabel,
}: ComboboxChipsProps<Value>) {
  const label = (item: Value) => (itemToStringLabel ? itemToStringLabel(item) : String(item));
  return (
    <BaseCombobox.Chips render={<ComboboxChipsElement magnitude={magnitude} />}>
      <BaseCombobox.Value>
        {(values: Value[]) => (
          <>
            {values.map((value) => {
              const chipLabel = label(value);
              return (
                <BaseCombobox.Chip
                  key={chipLabel}
                  render={<ComboboxChipElement />}
                  aria-label={chipLabel}
                >
                  {chipLabel}
                  <BaseCombobox.ChipRemove
                    render={<ComboboxChipRemoveElement />}
                    aria-label={removeLabel(value)}
                  >
                    <X aria-hidden />
                  </BaseCombobox.ChipRemove>
                </BaseCombobox.Chip>
              );
            })}
            <BaseCombobox.Input render={<ComboboxInputElement />} placeholder={placeholder} />
          </>
        )}
      </BaseCombobox.Value>
    </BaseCombobox.Chips>
  );
}
