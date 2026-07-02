import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { dialogActionsVariants } from "./variants";

export type DialogActionsProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The footer row of the dialog popup. Right-aligns action buttons (cancel, confirm, etc.) with a
 * gap between them. Padding is baked in to match the header and body gutters.
 */
export function DialogActions({ render, ...props }: DialogActionsProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: dialogActionsVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
