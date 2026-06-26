import { X } from "lucide-react";

import {
  AutocompleteClear as AutocompleteClearElement,
  type AutocompleteClearProps,
} from "../../ui/autocomplete";

export type { AutocompleteClearProps };

/**
 * Ready-made autocomplete clear: the styled button with a default clear icon when no children are
 * given.
 */
export function AutocompleteClear(props: AutocompleteClearProps) {
  return (
    <AutocompleteClearElement {...props}>
      {props.children ?? <X aria-hidden />}
    </AutocompleteClearElement>
  );
}
