import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { comboboxButtonVariants } from "./variants";

export type ComboboxTriggerProps = Omit<BaseCombobox.Trigger.Props, "className" | "style">;

export function ComboboxTrigger(props: ComboboxTriggerProps) {
  return <BaseCombobox.Trigger className={comboboxButtonVariants()} {...props} />;
}
