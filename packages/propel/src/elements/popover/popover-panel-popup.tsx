import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { popoverPanelPopupVariants } from "./variants";

/** Props for {@link PopoverPanelPopup}. */
export type PopoverPanelPopupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The popup as the scroll body of an elevated panel surface. Carries only the inner padding +
 * focus-outline reset — the surrounding panel supplies the surface chrome (border, background,
 * shadow, radius), so this never doubles it up. Base-UI-agnostic — graft in `components` via
 * `<BasePopover.Popup render={<PopoverPanelPopup/>} />`.
 */
export function PopoverPanelPopup({ render, ...props }: PopoverPanelPopupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: popoverPanelPopupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
