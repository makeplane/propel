import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { ListboxGroupLabel } from "../../internal/listbox-group-label";

export type AutocompleteGroupLabelProps = Omit<
  BaseAutocomplete.GroupLabel.Props,
  "className" | "style" | "render"
>;

/**
 * The muted heading naming an `AutocompleteGroup` — Base UI's `GroupLabel` behavior grafted onto
 * the shared styled listbox heading.
 */
export function AutocompleteGroupLabel(props: AutocompleteGroupLabelProps) {
  return <BaseAutocomplete.GroupLabel {...props} render={<ListboxGroupLabel />} />;
}
