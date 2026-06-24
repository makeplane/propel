import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { navItemHeaderVariants } from "./variants";

export type NavItemHeaderProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * A sidebar section header row. Holds a `NavItemHeaderToggle` (which collapses the section) and an
 * optional inline-end action as siblings.
 */
export function NavItemHeader({ render, ...props }: NavItemHeaderProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: navItemHeaderVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
