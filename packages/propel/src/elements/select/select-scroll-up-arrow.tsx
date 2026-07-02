import { useRender } from "@base-ui/react/use-render";

export type SelectScrollUpArrowProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled scroll-up affordance at the top of a scrollable popup. Base-UI-agnostic — graft the
 * scroll behavior in `components` via `<BaseSelect.ScrollUpArrow render={<SelectScrollUpArrow/>}
 * />`.
 */
export function SelectScrollUpArrow({ render, ...props }: SelectScrollUpArrowProps) {
  return useRender({ defaultTagName: "div", render, props });
}
