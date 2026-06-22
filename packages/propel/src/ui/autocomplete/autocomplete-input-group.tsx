import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { autocompleteInputGroupVariants } from "./variants";

export type AutocompleteInputGroupProps = Omit<
  BaseAutocomplete.InputGroup.Props,
  "className" | "style"
>;

export function AutocompleteInputGroup(props: AutocompleteInputGroupProps) {
  return <BaseAutocomplete.InputGroup className={autocompleteInputGroupVariants()} {...props} />;
}
