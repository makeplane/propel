import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check } from "lucide-react";

import { ComboboxItemIndicator as ComboboxItemIndicatorElement } from "../../elements/combobox";

export type ComboboxItemIndicatorProps = Omit<
  BaseCombobox.ItemIndicator.Props,
  "className" | "style"
>;

/**
 * Ready-made combobox item indicator: Base UI's selection behavior grafted onto the styled marker,
 * with a default check when no children are given (defaults are a `components` concern).
 */
export function ComboboxItemIndicator({ children, ...props }: ComboboxItemIndicatorProps) {
  return (
    <BaseCombobox.ItemIndicator {...props} render={<ComboboxItemIndicatorElement />}>
      {children ?? <Check aria-hidden />}
    </BaseCombobox.ItemIndicator>
  );
}
