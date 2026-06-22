import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { X } from "lucide-react";

import { autocompleteButtonVariants } from "./variants";

export type AutocompleteClearProps = Omit<BaseAutocomplete.Clear.Props, "className" | "style">;

export function AutocompleteClear(props: AutocompleteClearProps) {
  return (
    <BaseAutocomplete.Clear className={autocompleteButtonVariants()} {...props}>
      {props.children ?? <X aria-hidden className="size-4" />}
    </BaseAutocomplete.Clear>
  );
}
