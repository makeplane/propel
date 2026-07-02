import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { alertDialogActionsVariants } from "./variants";

export type AlertDialogActionsProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * Right-aligns action buttons with consistent horizontal spacing. The placement and gap are always
 * the same — baked in by the design system.
 */
export function AlertDialogActions({ render, ...props }: AlertDialogActionsProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: alertDialogActionsVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
