import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { popoverBodyVariants } from "./variants";

/** Props for {@link PopoverBody}. */
export type PopoverBodyProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The padded content column inside a `PopoverPopup`. Lays its children out as a vertical stack and
 * supplies the popup's internal padding, so the bare popup carries only the surface chrome. Layout
 * regions (e.g. `PopoverIntro`, `PopoverActions`) sit as its children, separated by its gap.
 */
export function PopoverBody({ render, ...props }: PopoverBodyProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: popoverBodyVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
