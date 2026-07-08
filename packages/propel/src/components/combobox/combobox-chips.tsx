import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import {
  type ComboboxMagnitude,
  ComboboxChipOverflow as ComboboxChipOverflowElement,
  ComboboxChips as ComboboxChipsElement,
  ComboboxInput as ComboboxInputElement,
} from "../../elements/combobox";

export type ComboboxChipsProps<Value = string> = {
  /** Visual size of the chips frame: height, text, and glyph sizing. Required. */
  magnitude: ComboboxMagnitude;
  /** Input placeholder shown while typing to add another value. */
  placeholder?: string;
  /**
   * Cap on how many chips render inline. When more are selected, the frame collapses to a single
   * row showing the first `maxVisible` chips followed by a "+N more" count (the rest stay managed
   * from the popup). Omit for the default behavior — chips wrap onto new rows as the selection
   * grows.
   */
  maxVisible?: number;
  /**
   * Renders one selected value as a `ComboboxChip` — the `ComboboxChips` counterpart of
   * `ComboboxList`'s item template. Set your own `key`, exactly like `ComboboxList`'s function
   * child, e.g. ``(value) => <ComboboxChip key={value} label={value} removeLabel={`Remove
   * ${value}`} />``.
   */
  children: (value: Value) => React.ReactNode;
};

/**
 * The ready-made multiselect input frame — it replaces `ComboboxInputGroup` in the `multiple`
 * anatomy. Grafts Base UI's `Chips` behavior onto the styled `elements/combobox` frame, owning only
 * the frame, the selected-values loop, and `maxVisible` overflow ahead of the inline input — each
 * chip's template is the consumer's `children`, mirroring `ComboboxList`. Without `maxVisible` the
 * chips wrap onto new rows; with it the frame collapses to one row of the first `maxVisible` chips
 * plus a "+N more" count. Arrow keys move focus across chips; Backspace removes.
 */
export function ComboboxChips<Value = string>({
  magnitude,
  placeholder,
  maxVisible,
  children,
}: ComboboxChipsProps<Value>) {
  const layout = maxVisible != null ? "collapse" : "wrap";
  return (
    <BaseCombobox.Chips render={<ComboboxChipsElement magnitude={magnitude} layout={layout} />}>
      <BaseCombobox.Value>
        {(values: Value[]) => {
          const visible = maxVisible != null ? values.slice(0, maxVisible) : values;
          const hiddenCount = values.length - visible.length;
          return (
            <>
              {visible.map(children)}
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
