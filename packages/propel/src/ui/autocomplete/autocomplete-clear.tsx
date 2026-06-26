import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { autocompleteButtonVariants } from "./variants";

export type AutocompleteClearProps = Omit<BaseAutocomplete.Clear.Props, "className" | "style">;

export function AutocompleteClear(props: AutocompleteClearProps) {
  return <BaseAutocomplete.Clear className={autocompleteButtonVariants()} {...props} />;
}
