import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

import { autocompleteItemVariants } from "./autocomplete-styles";

export type AutocompleteItemProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.Item>,
  "className" | "render" | "style"
>;

export function AutocompleteItem(props: AutocompleteItemProps) {
  return <BaseAutocomplete.Item className={autocompleteItemVariants()} {...props} />;
}
