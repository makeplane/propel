import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { X } from "lucide-react";
import type * as React from "react";

import { ComboboxChipRemove as ComboboxChipRemoveElement } from "../../elements/combobox";

export type ComboboxChipRemoveProps = Omit<
  BaseCombobox.ChipRemove.Props,
  "children" | "className" | "style"
> & {
  /** The remove glyph. Defaults to an X (defaults are a `components` concern). */
  icon?: React.ReactNode;
};

/**
 * Ready-made chip-remove control: Base UI's remove behavior grafted onto the styled button. Give it
 * an `aria-label` naming the value it removes.
 */
export function ComboboxChipRemove({ icon, ...props }: ComboboxChipRemoveProps) {
  return (
    <BaseCombobox.ChipRemove {...props} render={<ComboboxChipRemoveElement />}>
      {icon ?? <X aria-hidden />}
    </BaseCombobox.ChipRemove>
  );
}
