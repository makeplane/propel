import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check } from "lucide-react";

import { ComboboxItemIndicator as ComboboxItemIndicatorElement } from "../../elements/combobox";

export type ComboboxItemIndicatorProps = Omit<
  BaseCombobox.ItemIndicator.Props,
  "className" | "style"
>;

/**
 * Ready-made combobox item indicator: Base UI's selection behavior grafted onto the styled marker,
 * with a default check when no children are given (defaults are a `components` concern). Mounted on
 * every row by default — the `layout="indicator"` listbox row places children positionally, so the
 * marker must occupy the leading column even while unselected (the styled marker hides its glyph
 * off `data-selected`).
 */
export function ComboboxItemIndicator({ children, ...props }: ComboboxItemIndicatorProps) {
  return (
    <BaseCombobox.ItemIndicator keepMounted {...props} render={<ComboboxItemIndicatorElement />}>
      {children ?? <Check aria-hidden />}
    </BaseCombobox.ItemIndicator>
  );
}
