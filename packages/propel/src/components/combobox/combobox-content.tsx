import { ComboboxPopup, type ComboboxPopupProps } from "../../ui/combobox/combobox-popup";
import { ComboboxPortal } from "../../ui/combobox/combobox-portal";
import {
  ComboboxPositioner,
  type ComboboxPositionerProps,
} from "../../ui/combobox/combobox-positioner";

export type ComboboxContentProps = ComboboxPopupProps & {
  /** Which side of the input the list opens toward. @default "bottom" */
  side?: ComboboxPositionerProps["side"];
  /** Distance in px between the input and the list. @default 4 */
  sideOffset?: ComboboxPositionerProps["sideOffset"];
  /** Alignment of the list relative to the input along `side`. @default "start" */
  align?: ComboboxPositionerProps["align"];
};

/** The combobox list surface: portal + positioner + popup with Propel overlay styling. */
export function ComboboxContent({
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPortal>
      <ComboboxPositioner side={side} sideOffset={sideOffset} align={align}>
        <ComboboxPopup {...props}>{children}</ComboboxPopup>
      </ComboboxPositioner>
    </ComboboxPortal>
  );
}
