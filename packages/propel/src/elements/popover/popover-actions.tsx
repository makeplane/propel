import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { popoverActionsVariants } from "./variants";

/** Props for {@link PopoverActions}. */
export type PopoverActionsProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The popup's trailing controls row (e.g. a `PopoverClose` styled as a `Button`). Pushes its
 * children to the inline-end and spaces them by a gap. Sits as a child of `PopoverBody`.
 */
export function PopoverActions({ render, ...props }: PopoverActionsProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: popoverActionsVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
