import { ChevronsUpDown } from "lucide-react";

import {
  AutocompleteTrigger as AutocompleteTriggerElement,
  type AutocompleteTriggerProps,
} from "../../ui/autocomplete";

export type { AutocompleteTriggerProps };

/**
 * Ready-made autocomplete trigger: the styled button with a default chevron when no children are
 * given.
 */
export function AutocompleteTrigger(props: AutocompleteTriggerProps) {
  return (
    <AutocompleteTriggerElement {...props}>
      {props.children ?? <ChevronsUpDown aria-hidden />}
    </AutocompleteTriggerElement>
  );
}
