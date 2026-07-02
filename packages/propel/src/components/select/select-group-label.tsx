import { Select as BaseSelect } from "@base-ui/react/select";

import { ListboxGroupLabel } from "../../internal/listbox-group-label";

export type SelectGroupLabelProps = Omit<
  BaseSelect.GroupLabel.Props,
  "className" | "style" | "render"
>;

/**
 * The muted heading naming a `SelectGroup` — Base UI's `GroupLabel` behavior grafted onto the
 * shared styled listbox heading.
 */
export function SelectGroupLabel(props: SelectGroupLabelProps) {
  return <BaseSelect.GroupLabel {...props} render={<ListboxGroupLabel />} />;
}
