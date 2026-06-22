import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { comboboxEmptyVariants } from "./variants";

export type ComboboxEmptyProps = Omit<BaseCombobox.Empty.Props, "className" | "style">;

export function ComboboxEmpty(props: ComboboxEmptyProps) {
  return <BaseCombobox.Empty className={comboboxEmptyVariants()} {...props} />;
}
