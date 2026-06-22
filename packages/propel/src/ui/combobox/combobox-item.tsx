import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { comboboxItemVariants } from "./variants";

export type ComboboxItemProps = Omit<BaseCombobox.Item.Props, "className" | "style">;

export function ComboboxItem(props: ComboboxItemProps) {
  return <BaseCombobox.Item className={comboboxItemVariants()} {...props} />;
}
