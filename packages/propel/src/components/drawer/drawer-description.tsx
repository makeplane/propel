import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

import { OverlayDescription } from "../../internal/overlay-description";

export type DrawerDescriptionProps = Omit<BaseDrawer.Description.Props, "className" | "style">;

/**
 * Supporting text for the drawer: Base UI's `Drawer.Description` behavior (wired as the popup's
 * `aria-describedby` target) grafted onto the shared `internal/OverlayDescription` at
 * `magnitude="lg"` (rule 4a).
 */
export function DrawerDescription(props: DrawerDescriptionProps) {
  return <BaseDrawer.Description {...props} render={<OverlayDescription magnitude="lg" />} />;
}
