import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { autocompleteButtonVariants } from "./variants";

export type AutocompleteTriggerProps = Omit<BaseAutocomplete.Trigger.Props, "className" | "style">;

export function AutocompleteTrigger(props: AutocompleteTriggerProps) {
  return <BaseAutocomplete.Trigger className={autocompleteButtonVariants()} {...props} />;
}
