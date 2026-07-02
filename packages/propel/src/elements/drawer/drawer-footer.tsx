import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { drawerFooterVariants } from "./variants";

export type DrawerFooterProps = Omit<useRender.ComponentProps<"footer">, "className" | "style">;

/** The drawer's footer actions region (the Figma footer). Lays its actions at the inline-end. */
export function DrawerFooter({ render, ...props }: DrawerFooterProps) {
  const defaultProps: useRender.ElementProps<"footer"> = { className: drawerFooterVariants() };
  return useRender({ defaultTagName: "footer", render, props: mergeProps(defaultProps, props) });
}
