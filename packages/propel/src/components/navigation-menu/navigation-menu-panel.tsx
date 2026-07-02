import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

import {
  NavigationMenuPopup,
  type NavigationMenuPopupProps,
} from "../../elements/navigation-menu/navigation-menu-popup";
import { Positioner } from "../../internal/positioner";

export type NavigationMenuPanelProps = NavigationMenuPopupProps & {
  /** Which side of the trigger the panel opens toward. @default "bottom" */
  side?: BaseNavigationMenu.Positioner.Props["side"];
  /** Distance in px between the trigger and the panel. @default 4 */
  sideOffset?: BaseNavigationMenu.Positioner.Props["sideOffset"];
  /** Alignment of the panel relative to the trigger along `side`. @default "start" */
  align?: BaseNavigationMenu.Positioner.Props["align"];
};

/**
 * The navigation menu surface: Base UI portal + positioner + popup grafted onto Propel styling.
 * Named `Panel` to avoid clashing with Base UI's atomic per-item `NavigationMenu.Content`. The
 * viewport and per-item content remain children.
 */
export function NavigationMenuPanel({
  side = "bottom",
  sideOffset = 4,
  align = "start",
  ...props
}: NavigationMenuPanelProps) {
  return (
    <BaseNavigationMenu.Portal>
      <BaseNavigationMenu.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        render={<Positioner />}
      >
        <BaseNavigationMenu.Popup {...props} render={<NavigationMenuPopup />} />
      </BaseNavigationMenu.Positioner>
    </BaseNavigationMenu.Portal>
  );
}
