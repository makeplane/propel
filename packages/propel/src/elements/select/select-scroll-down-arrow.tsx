import { useRender } from "@base-ui/react/use-render";

export type SelectScrollDownArrowProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
>;

/**
 * The styled scroll-down affordance at the bottom of a scrollable popup. Base-UI-agnostic — graft
 * the scroll behavior in `components` via `<BaseSelect.ScrollDownArrow
 * render={<SelectScrollDownArrow/>} />`.
 */
export function SelectScrollDownArrow({ render, ...props }: SelectScrollDownArrowProps) {
  return useRender({ defaultTagName: "div", render, props });
}
