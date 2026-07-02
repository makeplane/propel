import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

export type ComboboxRowProps = Omit<BaseCombobox.Row.Props, "className" | "style">;

/** A grid row wrapper for multi-column listbox layouts (pass `cols` on the root's `grid`). */
export function ComboboxRow(props: ComboboxRowProps) {
  return <BaseCombobox.Row {...props} />;
}
