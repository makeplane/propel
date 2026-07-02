import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuFooterVariants } from "./variants";

export type MenuFooterProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/** A non-interactive footer pinned below a menu popup list (sticky chrome outside `role="menu"`). */
export function MenuFooter({ render, ...props }: MenuFooterProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: menuFooterVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
