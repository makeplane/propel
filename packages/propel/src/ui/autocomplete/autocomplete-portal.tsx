import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompletePortalProps = Omit<BaseAutocomplete.Portal.Props, "className" | "style">;

export function AutocompletePortal(props: AutocompletePortalProps) {
  return <BaseAutocomplete.Portal {...props} />;
}
