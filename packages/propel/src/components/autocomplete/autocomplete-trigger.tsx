import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { ChevronsUpDown } from "lucide-react";
import type * as React from "react";

import { autocompleteButtonVariants } from "./autocomplete-styles";

export type AutocompleteTriggerProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.Trigger>,
  "className" | "render" | "style"
>;

export function AutocompleteTrigger(props: AutocompleteTriggerProps) {
  return (
    <BaseAutocomplete.Trigger className={autocompleteButtonVariants()} {...props}>
      {props.children ?? <ChevronsUpDown aria-hidden className="size-4" />}
    </BaseAutocomplete.Trigger>
  );
}
