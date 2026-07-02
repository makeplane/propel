import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { ListboxGroupLabel } from "../../internal/listbox-group-label";

export type ComboboxGroupLabelProps = Omit<
  BaseCombobox.GroupLabel.Props,
  "className" | "style" | "render"
>;

/**
 * The muted heading naming a `ComboboxGroup` — Base UI's `GroupLabel` behavior (labels the group
 * for assistive tech) grafted onto the shared styled listbox heading.
 */
export function ComboboxGroupLabel(props: ComboboxGroupLabelProps) {
  return <BaseCombobox.GroupLabel {...props} render={<ListboxGroupLabel />} />;
}
