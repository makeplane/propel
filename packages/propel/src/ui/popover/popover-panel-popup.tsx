import { Popover as BasePopover } from "@base-ui/react/popover";

import { popoverPanelPopupVariants } from "./variants";

/** Props for {@link PopoverPanelPopup}; 1:1 with Base UI `Popover.Popup`. */
export type PopoverPanelPopupProps = Omit<BasePopover.Popup.Props, "className" | "style">;

/**
 * The popup as the scroll body of an elevated panel surface. Carries only the inner padding +
 * focus-outline reset — the surrounding panel supplies the surface chrome (border, background,
 * shadow, radius), so this never doubles it up. Use {@link PopoverPopup} for a self-contained popup
 * that is its own surface.
 */
export function PopoverPanelPopup(props: PopoverPanelPopupProps) {
  return <BasePopover.Popup className={popoverPanelPopupVariants()} {...props} />;
}
