import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { alertDialogIntroVariants } from "./variants";

export type AlertDialogIntroProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * Groups the title and description with consistent vertical spacing. The gap between title and
 * description is always the same — baked in by the design system.
 */
export function AlertDialogIntro({ render, ...props }: AlertDialogIntroProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: alertDialogIntroVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
