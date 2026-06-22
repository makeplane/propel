import {
  NavigationMenuPopup,
  type NavigationMenuPopupProps,
} from "../../ui/navigation-menu/navigation-menu-popup";
import { NavigationMenuPortal } from "../../ui/navigation-menu/navigation-menu-portal";
import {
  NavigationMenuPositioner,
  type NavigationMenuPositionerProps,
} from "../../ui/navigation-menu/navigation-menu-positioner";

export type NavigationMenuPanelProps = NavigationMenuPopupProps & {
  /** Which side of the trigger the panel opens toward. @default "bottom" */
  side?: NavigationMenuPositionerProps["side"];
  /** Distance in px between the trigger and the panel. @default 4 */
  sideOffset?: NavigationMenuPositionerProps["sideOffset"];
  /** Alignment of the panel relative to the trigger along `side`. @default "start" */
  align?: NavigationMenuPositionerProps["align"];
};

/**
 * The navigation menu surface: portal + positioner + popup with Propel overlay styling. Named
 * `Panel` to avoid clashing with the atomic per-item `NavigationMenuContent` part. The viewport and
 * per-item content remain children.
 */
export function NavigationMenuPanel({
  side = "bottom",
  sideOffset = 4,
  align = "start",
  ...props
}: NavigationMenuPanelProps) {
  return (
    <NavigationMenuPortal>
      <NavigationMenuPositioner side={side} sideOffset={sideOffset} align={align}>
        <NavigationMenuPopup {...props} />
      </NavigationMenuPositioner>
    </NavigationMenuPortal>
  );
}
