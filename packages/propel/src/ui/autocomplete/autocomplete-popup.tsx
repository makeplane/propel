import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

import { autocompletePopupVariants } from "./variants";

export type AutocompletePopupProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.Popup>,
  "className" | "style"
>;

export function AutocompletePopup(props: AutocompletePopupProps) {
  return <BaseAutocomplete.Popup className={autocompletePopupVariants()} {...props} />;
}
