import {
  AutocompletePopup,
  type AutocompletePopupProps,
} from "../../ui/autocomplete/autocomplete-popup";
import { AutocompletePortal } from "../../ui/autocomplete/autocomplete-portal";
import {
  AutocompletePositioner,
  type AutocompletePositionerProps,
} from "../../ui/autocomplete/autocomplete-positioner";

export type AutocompleteContentProps = AutocompletePopupProps & {
  /** Which side of the input the list opens toward. @default "bottom" */
  side?: AutocompletePositionerProps["side"];
  /** Distance in px between the input and the list. @default 4 */
  sideOffset?: AutocompletePositionerProps["sideOffset"];
  /** Alignment of the list relative to the input along `side`. @default "start" */
  align?: AutocompletePositionerProps["align"];
};

/** The autocomplete list surface: portal + positioner + popup with Propel overlay styling. */
export function AutocompleteContent({
  side = "bottom",
  sideOffset = 4,
  align = "start",
  ...props
}: AutocompleteContentProps) {
  return (
    <AutocompletePortal>
      <AutocompletePositioner side={side} sideOffset={sideOffset} align={align}>
        <AutocompletePopup {...props} />
      </AutocompletePositioner>
    </AutocompletePortal>
  );
}
