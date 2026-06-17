import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

import { autocompleteEmptyVariants } from "./autocomplete-styles";

export type AutocompleteEmptyProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.Empty>,
  "className" | "render" | "style"
>;

export function AutocompleteEmpty(props: AutocompleteEmptyProps) {
  return <BaseAutocomplete.Empty className={autocompleteEmptyVariants()} {...props} />;
}
