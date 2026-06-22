import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { autocompleteEmptyVariants } from "./variants";

export type AutocompleteEmptyProps = Omit<BaseAutocomplete.Empty.Props, "className" | "style">;

export function AutocompleteEmpty(props: AutocompleteEmptyProps) {
  return <BaseAutocomplete.Empty className={autocompleteEmptyVariants()} {...props} />;
}
