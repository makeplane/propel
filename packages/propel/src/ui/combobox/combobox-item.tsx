import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import { comboboxItemVariants } from "./variants";

export type ComboboxItemProps = Omit<
  React.ComponentProps<typeof BaseCombobox.Item>,
  "className" | "style"
>;

export function ComboboxItem(props: ComboboxItemProps) {
  return <BaseCombobox.Item className={comboboxItemVariants()} {...props} />;
}
