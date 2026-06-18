import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { ChevronsUpDown } from "lucide-react";
import type * as React from "react";

import { autocompleteButtonVariants } from "./variants";

export type AutocompleteTriggerProps = Omit<
  React.ComponentProps<typeof BaseAutocomplete.Trigger>,
  "className" | "style"
>;

export function AutocompleteTrigger(props: AutocompleteTriggerProps) {
  return (
    <BaseAutocomplete.Trigger className={autocompleteButtonVariants()} {...props}>
      {props.children ?? <ChevronsUpDown aria-hidden className="size-4" />}
    </BaseAutocomplete.Trigger>
  );
}
