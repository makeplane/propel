import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type NavItemVariantProps, navItemVariants } from "./variants";

export type { NavItemLevel, NavItemMagnitude } from "./variants";

export type NavItemProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> &
  NavItemVariantProps & {
    /** Whether this row is the current/selected item. */
    active?: boolean;
  };

/**
 * A single sidebar navigation row. Renders its children as the row body — compose `NavItemIcon`,
 * `NavItemLabel`, and `NavItemTrailing` inside it. Pass `render` to make it a link while keeping
 * the selected semantics.
 */
export function NavItem({ magnitude, level, active = false, render, ...props }: NavItemProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    ...(render == null ? { type: "button" } : null),
    "aria-current": active ? "page" : undefined,
    className: navItemVariants({ magnitude, level }),
  };

  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps(defaultProps, props),
    state: { active },
    stateAttributesMapping: {
      active: (value) => (value ? { "data-active": "" } : null),
    },
  });
}
