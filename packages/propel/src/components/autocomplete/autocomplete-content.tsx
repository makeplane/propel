import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { ListboxPopup, type ListboxPopupProps } from "../../internal/listbox-popup";
import { Positioner } from "../../internal/positioner";

export type AutocompleteContentProps = ListboxPopupProps & {
  /** Which side of the input the list opens toward. @default "bottom" */
  side?: BaseAutocomplete.Positioner.Props["side"];
  /** Distance in px between the input and the list. @default 4 */
  sideOffset?: BaseAutocomplete.Positioner.Props["sideOffset"];
  /** Alignment of the list relative to the input along `side`. @default "start" */
  align?: BaseAutocomplete.Positioner.Props["align"];
};

/** The autocomplete list surface: Base UI portal + positioner + popup grafted onto Propel styling. */
export function AutocompleteContent({
  side = "bottom",
  sideOffset = 4,
  align = "start",
  ...props
}: AutocompleteContentProps) {
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        render={<Positioner />}
      >
        <BaseAutocomplete.Popup {...props} render={<ListboxPopup />} />
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  );
}
