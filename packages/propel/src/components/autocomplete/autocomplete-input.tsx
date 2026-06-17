import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

import { autocompleteInputVariants } from "./autocomplete-styles";

export type AutocompleteInputProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.Input>,
  "className" | "render" | "style"
>;

export function AutocompleteInput(props: AutocompleteInputProps) {
  return <BaseAutocomplete.Input className={autocompleteInputVariants()} {...props} />;
}
