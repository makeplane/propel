import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { X } from "lucide-react";

import { comboboxButtonVariants } from "./variants";

export type ComboboxClearProps = Omit<BaseCombobox.Clear.Props, "className" | "style">;

export function ComboboxClear(props: ComboboxClearProps) {
  return (
    <BaseCombobox.Clear className={comboboxButtonVariants()} {...props}>
      {props.children ?? <X aria-hidden className="size-4" />}
    </BaseCombobox.Clear>
  );
}
