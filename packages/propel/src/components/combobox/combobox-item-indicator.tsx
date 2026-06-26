import { Check } from "lucide-react";

import {
  ComboboxItemIndicator as ComboboxItemIndicatorElement,
  type ComboboxItemIndicatorProps,
} from "../../ui/combobox";

export type { ComboboxItemIndicatorProps };

/**
 * Ready-made combobox item indicator: the styled marker with a default check when no children are
 * given.
 */
export function ComboboxItemIndicator(props: ComboboxItemIndicatorProps) {
  return (
    <ComboboxItemIndicatorElement {...props}>
      {props.children ?? <Check aria-hidden />}
    </ComboboxItemIndicatorElement>
  );
}
