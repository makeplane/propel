import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { AutocompleteEmpty as AutocompleteEmptyElement } from "../../elements/autocomplete";

export type AutocompleteEmptyProps = Omit<
  BaseAutocomplete.Empty.Props,
  "className" | "style" | "render"
>;

/**
 * The ready-made empty state: grafts Base UI's `Autocomplete.Empty` visibility behavior onto the
 * styled empty-state row. Pass the — localizable — no-matches message as children.
 */
export function AutocompleteEmpty(props: AutocompleteEmptyProps) {
  return <BaseAutocomplete.Empty {...props} render={<AutocompleteEmptyElement />} />;
}
