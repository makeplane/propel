import { SelectPopup, type SelectPopupProps } from "../../ui/select/select-popup";
import { SelectPortal } from "../../ui/select/select-portal";
import { SelectPositioner, type SelectPositionerProps } from "../../ui/select/select-positioner";

export type SelectContentProps = SelectPopupProps & {
  /** Which side of the trigger the list opens toward. @default "bottom" */
  side?: SelectPositionerProps["side"];
  /** Distance in px between the trigger and the list. @default 4 */
  sideOffset?: SelectPositionerProps["sideOffset"];
  /** Alignment of the list relative to the trigger along `side`. @default "start" */
  align?: SelectPositionerProps["align"];
};

/** The select list surface: portal + positioner + popup with Propel overlay styling. */
export function SelectContent({
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  ...props
}: SelectContentProps) {
  return (
    <SelectPortal>
      <SelectPositioner side={side} sideOffset={sideOffset} align={align}>
        <SelectPopup {...props}>{children}</SelectPopup>
      </SelectPositioner>
    </SelectPortal>
  );
}
