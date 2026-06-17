import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

import { autocompletePopupVariants } from "./autocomplete-styles";

export type AutocompletePopupProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.Popup>,
  "className" | "render" | "style"
>;

export function AutocompletePopup(props: AutocompletePopupProps) {
  return <BaseAutocomplete.Popup className={autocompletePopupVariants()} {...props} />;
}
