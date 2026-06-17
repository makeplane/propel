import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import { comboboxPopupVariants } from "./combobox-styles";

export type ComboboxPopupProps = Omit<
  React.ComponentProps<typeof BaseCombobox.Popup>,
  "className" | "render" | "style"
>;

export function ComboboxPopup(props: ComboboxPopupProps) {
  return <BaseCombobox.Popup className={comboboxPopupVariants()} {...props} />;
}
