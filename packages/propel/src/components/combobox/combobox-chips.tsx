import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { X } from "lucide-react";

import {
  type ComboboxMagnitude,
  ComboboxChip as ComboboxChipElement,
  ComboboxChipRemove as ComboboxChipRemoveElement,
  ComboboxChips as ComboboxChipsElement,
  ComboboxInput as ComboboxInputElement,
} from "../../elements/combobox";

export type ComboboxChipsProps = {
  /** Visual size of the chips frame: height, text, and glyph sizing. Required. */
  magnitude: ComboboxMagnitude;
  /** Input placeholder shown while typing to add another value. */
  placeholder?: string;
  /**
   * Accessible name for a value's chip-remove button (e.g. `` (value) => `Remove ${value}` ``).
   * Localizable, so it is required — the frame bakes no label text.
   */
  removeLabel: (value: string) => string;
  /** Display text for a selected value's chip. Defaults to the value itself. */
  itemLabel?: (value: string) => string;
};

/**
 * The ready-made multiselect input frame — it replaces `ComboboxInputGroup` in the `multiple`
 * anatomy. Grafts Base UI's `Chips` behavior onto the styled `elements/combobox` frame and maps
 * each selected value to a removable chip (label + X remove button) ahead of the inline input,
 * wrapping onto new rows as the selection grows. Arrow keys move focus across chips; Backspace
 * removes.
 */
export function ComboboxChips({
  magnitude,
  placeholder,
  removeLabel,
  itemLabel = (value) => value,
}: ComboboxChipsProps) {
  return (
    <BaseCombobox.Chips render={<ComboboxChipsElement magnitude={magnitude} />}>
      <BaseCombobox.Value>
        {(values: string[]) => (
          <>
            {values.map((value) => {
              const label = itemLabel(value);
              return (
                <BaseCombobox.Chip key={value} render={<ComboboxChipElement />} aria-label={label}>
                  {label}
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
