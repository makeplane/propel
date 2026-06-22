import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { comboboxPositionerVariants } from "./variants";

export type ComboboxPositionerProps = Omit<BaseCombobox.Positioner.Props, "className" | "style">;

export function ComboboxPositioner(props: ComboboxPositionerProps) {
  return <BaseCombobox.Positioner className={comboboxPositionerVariants()} {...props} />;
}
