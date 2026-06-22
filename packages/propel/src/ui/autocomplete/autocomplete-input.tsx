import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { autocompleteInputVariants } from "./variants";

export type AutocompleteInputProps = Omit<BaseAutocomplete.Input.Props, "className" | "style">;

export function AutocompleteInput(props: AutocompleteInputProps) {
  return <BaseAutocomplete.Input className={autocompleteInputVariants()} {...props} />;
}
