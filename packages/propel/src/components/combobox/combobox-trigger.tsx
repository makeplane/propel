import { ChevronsUpDown } from "lucide-react";

import {
  ComboboxTrigger as ComboboxTriggerElement,
  type ComboboxTriggerProps,
} from "../../ui/combobox";

export type { ComboboxTriggerProps };

/** Ready-made combobox trigger: the styled button with a default chevron when no children are given. */
export function ComboboxTrigger(props: ComboboxTriggerProps) {
  return (
    <ComboboxTriggerElement {...props}>
      {props.children ?? <ChevronsUpDown aria-hidden />}
    </ComboboxTriggerElement>
  );
}
