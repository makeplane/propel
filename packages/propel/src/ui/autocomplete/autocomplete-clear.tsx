import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { X } from "lucide-react";
import type * as React from "react";

import { autocompleteButtonVariants } from "./variants";

export type AutocompleteClearProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.Clear>,
  "className" | "style"
>;

export function AutocompleteClear(props: AutocompleteClearProps) {
  return (
    <BaseAutocomplete.Clear className={autocompleteButtonVariants()} {...props}>
      {props.children ?? <X aria-hidden className="size-4" />}
    </BaseAutocomplete.Clear>
  );
}
