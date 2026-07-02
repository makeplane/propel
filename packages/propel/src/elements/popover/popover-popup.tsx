import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { popoverPopupVariants } from "./variants";

/** Props for {@link PopoverPopup}. */
export type PopoverPopupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The self-contained popup surface — an elevated card carrying its own border, background, shadow,
 * radius, and the open/close scale-fade. Base-UI-agnostic — graft in `components` via
 * `<BasePopover.Popup render={<PopoverPopup/>} />`. Use {@link PopoverPanelPopup} for a bare scroll
 * body inside an elevated panel that supplies the surface chrome.
 */
export function PopoverPopup({ render, ...props }: PopoverPopupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: popoverPopupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
