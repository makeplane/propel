import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { comboboxItemIndicatorVariants } from "./variants";

export type ComboboxItemIndicatorProps = Omit<
  BaseCombobox.ItemIndicator.Props,
  "className" | "style"
>;

export function ComboboxItemIndicator(props: ComboboxItemIndicatorProps) {
  return <BaseCombobox.ItemIndicator className={comboboxItemIndicatorVariants()} {...props} />;
}
