import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { alertDialogHeaderVariants } from "./variants";

export type AlertDialogHeaderProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The top region of the popup: lays out the leading `AlertDialogIcon` at the inline-start of the
 * `AlertDialogIntro` (icon left of title), per the design spec. The icon and intro are passed as
 * children.
 */
export function AlertDialogHeader({ render, ...props }: AlertDialogHeaderProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: alertDialogHeaderVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
