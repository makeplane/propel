import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";

/**
 * The shared popup viewport surface, grafted onto any Base UI `*.Viewport` behavior in `components`
 * (`<BaseMenu.Viewport render={<PopupViewport />}>`). A `relative` content wrapper inside the popup
 * that morphs/clips during submenu or size transitions. Byte-identical across every overlay family
 * (menu, popover, tooltip), so it lives here rather than being copied per family (rule 4a).
 */
export const popupViewportVariants = cva("relative");

export type PopupViewportProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

export function PopupViewport({ render, ...props }: PopupViewportProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: popupViewportVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
