import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { comboboxButtonVariants } from "./variants";

export type ComboboxClearProps = Omit<BaseCombobox.Clear.Props, "className" | "style">;

export function ComboboxClear(props: ComboboxClearProps) {
  return <BaseCombobox.Clear className={comboboxButtonVariants()} {...props} />;
}
