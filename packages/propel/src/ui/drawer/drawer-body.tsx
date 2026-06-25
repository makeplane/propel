import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { drawerBodyVariants } from "./variants";

export type DrawerBodyProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The drawer's main content region (the Figma body). Grows to fill the space between the header and
 * footer and scrolls its own overflow.
 */
export function DrawerBody({ render, ...props }: DrawerBodyProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: drawerBodyVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
