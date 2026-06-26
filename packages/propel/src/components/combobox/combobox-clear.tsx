import { X } from "lucide-react";

import { ComboboxClear as ComboboxClearElement, type ComboboxClearProps } from "../../ui/combobox";

export type { ComboboxClearProps };

/**
 * Ready-made combobox clear: the styled button with a default clear icon when no children are
 * given.
 */
export function ComboboxClear(props: ComboboxClearProps) {
  return (
    <ComboboxClearElement {...props}>{props.children ?? <X aria-hidden />}</ComboboxClearElement>
  );
}
