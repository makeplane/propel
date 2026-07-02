import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { ListboxStatus } from "../../internal/listbox-status";

export type AutocompleteStatusProps = Omit<
  BaseAutocomplete.Status.Props,
  "className" | "style" | "render"
>;

/**
 * A polite live region inside the popup for async hints ("Searching…", "12 results") — Base UI's
 * `Status` behavior grafted onto the shared muted listbox hint styling.
 */
export function AutocompleteStatus(props: AutocompleteStatusProps) {
  return <BaseAutocomplete.Status {...props} render={<ListboxStatus />} />;
}
