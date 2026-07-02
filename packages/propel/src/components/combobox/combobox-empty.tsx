import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { ComboboxEmpty as ComboboxEmptyElement } from "../../elements/combobox";

export type ComboboxEmptyProps = Omit<BaseCombobox.Empty.Props, "className" | "style">;

/**
 * The ready-made empty-state row: Base UI's `Empty` behavior grafted onto the styled
 * `elements/combobox` row. Pass the — localizable — no-matches message as children.
 */
export function ComboboxEmpty(props: ComboboxEmptyProps) {
  return <BaseCombobox.Empty {...props} render={<ComboboxEmptyElement />} />;
}
