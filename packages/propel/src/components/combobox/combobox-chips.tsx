import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { X } from "lucide-react";
import type * as React from "react";

import {
  type ComboboxMagnitude,
  ComboboxChip as ComboboxChipElement,
  ComboboxChipOverflow as ComboboxChipOverflowElement,
  ComboboxChipRemove as ComboboxChipRemoveElement,
  ComboboxChips as ComboboxChipsElement,
  ComboboxInput as ComboboxInputElement,
} from "../../elements/combobox";
import { Icon } from "../../internal/icon";

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
  /**
   * Cap on how many chips render inline. When more are selected, the frame collapses to a single
   * row showing the first `maxVisible` chips followed by a "+N more" count (the rest stay managed
   * from the popup). Omit for the default behavior — chips wrap onto new rows as the selection
   * grows.
   */
  maxVisible?: number;
  /**
   * A contextual node rendered at the inline-start of each chip (e.g. an assignee `Avatar` or an
   * entity-type glyph), sized to the chip's `--node-size`. Decorative — the chip's label carries
   * its accessible name.
   */
  startIcon?: (item: Value) => React.ReactNode;
  /**
   * A contextual node rendered after each chip's label, before the remove control (e.g. a status
   * glyph), sized to the chip's `--node-size`. Decorative — the chip's label carries its name.
   */
  endIcon?: (item: Value) => React.ReactNode;
};

/**
 * The ready-made multiselect input frame — it replaces `ComboboxInputGroup` in the `multiple`
 * anatomy. Grafts Base UI's `Chips` behavior onto the styled `elements/combobox` frame and maps
 * each selected value to a removable chip (optional leading/trailing node + label + X remove) ahead
 * of the inline input. Without `maxVisible` the chips wrap onto new rows; with it the frame
 * collapses to one row of the first `maxVisible` chips plus a "+N more" count. Arrow keys move
 * focus across chips; Backspace removes.
 */
export function ComboboxChips<Value = string>({
  magnitude,
  placeholder,
  removeLabel,
  itemToStringLabel,
  maxVisible,
  startIcon,
  endIcon,
}: ComboboxChipsProps<Value>) {
  const label = (item: Value) => (itemToStringLabel ? itemToStringLabel(item) : String(item));
  const layout = maxVisible != null ? "collapse" : "wrap";
  return (
    <BaseCombobox.Chips render={<ComboboxChipsElement magnitude={magnitude} layout={layout} />}>
      <BaseCombobox.Value>
        {(values: Value[]) => {
          const visible = maxVisible != null ? values.slice(0, maxVisible) : values;
          const hiddenCount = values.length - visible.length;
          return (
            <>
              {visible.map((value) => {
                const chipLabel = label(value);
                return (
                  <BaseCombobox.Chip
                    key={chipLabel}
                    render={<ComboboxChipElement />}
                    aria-label={chipLabel}
                  >
                    {startIcon ? <Icon>{startIcon(value)}</Icon> : null}
                    {chipLabel}
                    {endIcon ? <Icon>{endIcon(value)}</Icon> : null}
                    <BaseCombobox.ChipRemove
                      render={<ComboboxChipRemoveElement />}
                      aria-label={removeLabel(value)}
                    >
                      <X aria-hidden />
                    </BaseCombobox.ChipRemove>
                  </BaseCombobox.Chip>
                );
              })}
              {hiddenCount > 0 ? (
                <ComboboxChipOverflowElement>+{hiddenCount} more</ComboboxChipOverflowElement>
              ) : null}
              <BaseCombobox.Input render={<ComboboxInputElement />} placeholder={placeholder} />
            </>
          );
        }}
      </BaseCombobox.Value>
    </BaseCombobox.Chips>
  );
}
