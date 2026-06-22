import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { comboboxPopupVariants } from "./variants";

export type ComboboxPopupProps = Omit<BaseCombobox.Popup.Props, "className" | "style">;

export function ComboboxPopup(props: ComboboxPopupProps) {
  return <BaseCombobox.Popup className={comboboxPopupVariants()} {...props} />;
}
