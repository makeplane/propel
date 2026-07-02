import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { ListboxStatus } from "../../internal/listbox-status";

export type ComboboxStatusProps = Omit<BaseCombobox.Status.Props, "className" | "style" | "render">;

/**
 * A polite live region inside the popup for async hints ("Searching…", "12 results") — Base UI's
 * `Status` behavior grafted onto the shared muted listbox hint styling.
 */
export function ComboboxStatus(props: ComboboxStatusProps) {
  return <BaseCombobox.Status {...props} render={<ListboxStatus />} />;
}
