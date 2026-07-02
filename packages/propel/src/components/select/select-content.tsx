import { Select as BaseSelect } from "@base-ui/react/select";

import { ListboxPopup, type ListboxPopupProps } from "../../internal/listbox-popup";
import { Positioner } from "../../internal/positioner";

export type SelectContentProps = ListboxPopupProps & {
  /** Which side of the trigger the list opens toward. @default "bottom" */
  side?: BaseSelect.Positioner.Props["side"];
  /** Distance in px between the trigger and the list. @default 4 */
  sideOffset?: BaseSelect.Positioner.Props["sideOffset"];
  /** Alignment of the list relative to the trigger along `side`. @default "start" */
  align?: BaseSelect.Positioner.Props["align"];
};

/** The select list surface: Base UI portal + positioner + popup grafted onto Propel styling. */
export function SelectContent({
  side = "bottom",
  sideOffset = 4,
  align = "start",
  ...props
}: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        render={<Positioner />}
      >
        <BaseSelect.Popup {...props} render={<ListboxPopup />} />
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}
