import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { autocompleteItemVariants } from "./variants";

export type AutocompleteItemProps = Omit<BaseAutocomplete.Item.Props, "className" | "style">;

export function AutocompleteItem(props: AutocompleteItemProps) {
  return <BaseAutocomplete.Item className={autocompleteItemVariants()} {...props} />;
}
