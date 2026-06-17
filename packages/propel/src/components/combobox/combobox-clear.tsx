import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { X } from "lucide-react";
import type * as React from "react";

import { comboboxButtonVariants } from "./combobox-styles";

export type ComboboxClearProps = Omit<
  React.ComponentProps<typeof BaseCombobox.Clear>,
  "className" | "render" | "style"
>;

export function ComboboxClear(props: ComboboxClearProps) {
  return (
    <BaseCombobox.Clear className={comboboxButtonVariants()} {...props}>
      {props.children ?? <X aria-hidden className="size-4" />}
    </BaseCombobox.Clear>
  );
}
