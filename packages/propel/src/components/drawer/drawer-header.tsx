import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { X } from "lucide-react";

import {
  DrawerHeader as DrawerHeaderElement,
  type DrawerHeaderProps as DrawerHeaderElementProps,
} from "../../elements/drawer";
import { IconButton } from "../icon-button";

export type DrawerHeaderProps = DrawerHeaderElementProps & {
  /** Accessible label for the built-in corner close button. @default "Close" */
  closeLabel?: string;
};

/**
 * The drawer's top region with a built-in corner close: lays the consumer's heading block (a
 * `DrawerHeaderContent`) at the inline-start and a ghost `IconButton` dismiss at the inline-end, so
 * every drawer gets a consistent close without hand-wiring one. The close grafts Base UI's
 * `Drawer.Close` behavior onto the `IconButton` (behavior part outer, styled part as render
 * target). Pass `closeLabel` to localize its accessible name. For a header without the close,
 * compose the `elements/drawer` `DrawerHeader` atom directly.
 */
export function DrawerHeader({ closeLabel = "Close", children, ...props }: DrawerHeaderProps) {
  return (
    <DrawerHeaderElement {...props}>
      {children}
      <BaseDrawer.Close
        render={
          <IconButton prominence="ghost" tone="neutral" magnitude="lg" aria-label={closeLabel}>
            <X aria-hidden />
          </IconButton>
        }
      />
    </DrawerHeaderElement>
  );
}
