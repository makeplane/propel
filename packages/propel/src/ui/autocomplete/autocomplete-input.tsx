import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { type AutocompleteInputVariantProps, autocompleteInputVariants } from "./variants";

export type AutocompleteInputProps = Omit<BaseAutocomplete.Input.Props, "className" | "style"> &
  AutocompleteInputVariantProps;

export function AutocompleteInput({ magnitude, ...props }: AutocompleteInputProps) {
  return <BaseAutocomplete.Input className={autocompleteInputVariants({ magnitude })} {...props} />;
}
