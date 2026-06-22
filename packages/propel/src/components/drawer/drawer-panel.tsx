import {
  DrawerBackdrop,
  DrawerContent,
  DrawerPopup,
  type DrawerPopupProps,
  DrawerPortal,
  DrawerViewport,
} from "../../ui/drawer";

export type DrawerPanelProps = DrawerPopupProps;

/**
 * Convenience that composes the drawer overlay boilerplate — portal, backdrop, edge viewport,
 * sliding popup, and the padded inner content region — so a consumer only writes the trigger and
 * the panel body.
 *
 * Named `DrawerPanel` to avoid clashing with the atomic `DrawerContent` part (the padded inner
 * content region), which this convenience composes internally.
 */
export function DrawerPanel({ children, ...props }: DrawerPanelProps) {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerViewport>
        <DrawerPopup {...props}>
          <DrawerContent>{children}</DrawerContent>
        </DrawerPopup>
      </DrawerViewport>
    </DrawerPortal>
  );
}
