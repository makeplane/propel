import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { comboboxInputGroupVariants } from "./variants";

export type ComboboxInputGroupProps = Omit<BaseCombobox.InputGroup.Props, "className" | "style">;

export function ComboboxInputGroup(props: ComboboxInputGroupProps) {
  return <BaseCombobox.InputGroup className={comboboxInputGroupVariants()} {...props} />;
}
