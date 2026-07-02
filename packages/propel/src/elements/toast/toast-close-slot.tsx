import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toastCloseSlotVariants } from "./variants";

export type ToastCloseSlotProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The positioned slot that pins the dismiss button to the toast's inline-end corner. Holds only the
 * 4px corner offset against the `relative` toast popup; the button's chrome comes from the composed
 * `IconButton`.
 */
export function ToastCloseSlot({ render, ...props }: ToastCloseSlotProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: toastCloseSlotVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
