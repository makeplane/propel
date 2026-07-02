import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { popoverArrowVariants } from "./variants";

/** Props for {@link PopoverArrow}. */
export type PopoverArrowProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The popover's caret — a small rotated square clipped to a triangle that points back at the
 * trigger, its offset and clip switching per `data-[side]`. Base-UI-agnostic — graft in
 * `components` via `<BasePopover.Arrow render={<PopoverArrow/>} />`.
 */
export function PopoverArrow({ render, ...props }: PopoverArrowProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: popoverArrowVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
