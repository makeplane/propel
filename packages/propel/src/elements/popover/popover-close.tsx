import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { popoverCloseVariants } from "./variants";

/** Props for {@link PopoverClose}. */
export type PopoverCloseProps = Omit<useRender.ComponentProps<"button">, "className" | "style">;

/**
 * The bare button that dismisses the popover — no icon-button chrome baked in, just a focus ring.
 * Base-UI-agnostic — graft in `components` via `<BasePopover.Close render={<PopoverClose/>} />`; to
 * give it a fuller look, graft the close behavior onto a `Button` instead (`<BasePopover.Close
 * render={<Button…/>} />`).
 */
export function PopoverClose({ render, ...props }: PopoverCloseProps) {
  const defaultProps: useRender.ElementProps<"button"> = { className: popoverCloseVariants() };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
