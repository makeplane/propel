import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { comboboxLabelVariants } from "./variants";

export type ComboboxLabelProps = Omit<BaseCombobox.Label.Props, "className" | "style">;

export function ComboboxLabel(props: ComboboxLabelProps) {
  return <BaseCombobox.Label className={comboboxLabelVariants()} {...props} />;
}
