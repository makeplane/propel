import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { comboboxInputVariants } from "./variants";

export type ComboboxInputProps = Omit<BaseCombobox.Input.Props, "className" | "style">;

export function ComboboxInput(props: ComboboxInputProps) {
  return <BaseCombobox.Input className={comboboxInputVariants()} {...props} />;
}
