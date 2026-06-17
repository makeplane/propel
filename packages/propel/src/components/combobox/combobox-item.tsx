import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import { comboboxItemVariants } from "./combobox-styles";

export type ComboboxItemProps = Omit<
  React.ComponentProps<typeof BaseCombobox.Item>,
  "className" | "render" | "style"
>;

export function ComboboxItem(props: ComboboxItemProps) {
  return <BaseCombobox.Item className={comboboxItemVariants()} {...props} />;
}
