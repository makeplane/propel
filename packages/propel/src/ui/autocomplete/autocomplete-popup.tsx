import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { autocompletePopupVariants } from "./variants";

export type AutocompletePopupProps = Omit<BaseAutocomplete.Popup.Props, "className" | "style">;

export function AutocompletePopup(props: AutocompletePopupProps) {
  return <BaseAutocomplete.Popup className={autocompletePopupVariants()} {...props} />;
}
