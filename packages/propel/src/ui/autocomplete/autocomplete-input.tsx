import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

import { autocompleteInputVariants } from "./variants";

export type AutocompleteInputProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.Input>,
  "className" | "style"
>;

export function AutocompleteInput(props: AutocompleteInputProps) {
  return <BaseAutocomplete.Input className={autocompleteInputVariants()} {...props} />;
}
