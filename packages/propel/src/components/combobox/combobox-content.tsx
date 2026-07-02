import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

import { ListboxPopup, type ListboxPopupProps } from "../../internal/listbox-popup";
import { Positioner } from "../../internal/positioner";

export type ComboboxContentProps = ListboxPopupProps & {
  /** Which side of the input the list opens toward. @default "bottom" */
  side?: BaseCombobox.Positioner.Props["side"];
  /** Distance in px between the input and the list. @default 4 */
  sideOffset?: BaseCombobox.Positioner.Props["sideOffset"];
  /** Alignment of the list relative to the input along `side`. @default "start" */
  align?: BaseCombobox.Positioner.Props["align"];
};

/** The combobox list surface: Base UI portal + positioner + popup grafted onto Propel styling. */
export function ComboboxContent({
  side = "bottom",
  sideOffset = 4,
  align = "start",
  ...props
}: ComboboxContentProps) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        render={<Positioner />}
      >
        <BaseCombobox.Popup {...props} render={<ListboxPopup />} />
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}
