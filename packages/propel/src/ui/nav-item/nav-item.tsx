import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { type VariantProps } from "class-variance-authority";

import { navItemVariants } from "./variants";

export type NavItemMagnitude = NonNullable<VariantProps<typeof navItemVariants>["magnitude"]>;
export type NavItemLevel = NonNullable<VariantProps<typeof navItemVariants>["level"]>;

export type NavItemProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> & {
  /** Size of the row label. */
  magnitude: NavItemMagnitude;
  /** Nesting depth. Defaults to `1`. */
  level?: NavItemLevel;
  /** Whether this row is the current/selected item. */
  active?: boolean;
};

/**
 * A single sidebar navigation row. Renders its children as the row body — compose `NavItemIcon`,
 * `NavItemLabel`, and `NavItemTrailing` inside it. Pass `render` to make it a link while keeping
 * the selected semantics.
 */
export function NavItem({ magnitude, level = 1, active = false, render, ...props }: NavItemProps) {
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
