import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cx, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { navItemVariants } from "./nav-item-context";

export type NavItemMagnitude = NonNullable<VariantProps<typeof navItemVariants>["magnitude"]>;
export type NavItemLevel = NonNullable<VariantProps<typeof navItemVariants>["level"]>;

export type NavItemProps = Omit<useRender.ComponentProps<"button">, "className" | "style"> & {
  /** The row label. */
  children: React.ReactNode;
  /** Size of the row label. */
  magnitude: NavItemMagnitude;
  /** Nesting depth. Defaults to `1`. */
  level?: NavItemLevel;
  /** Whether this row is the current/selected item. */
  active?: boolean;
  /** Leading content at the inline-start. */
  inlineStartNode?: React.ReactNode;
  /** Optional inline-end content. */
  inlineEndNode?: React.ReactNode;
};

/** A single sidebar navigation row. */
export function NavItem({
  children,
  magnitude,
  level = 1,
  active = false,
  inlineStartNode,
  inlineEndNode,
  render,
  ...props
}: NavItemProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    ...(render == null ? { type: "button" } : null),
    "aria-current": active ? "page" : undefined,
    className: navItemVariants({ magnitude, level }),
    children: (
      <>
        {inlineStartNode ? (
          <span
            aria-hidden
            className={cx(
              "flex size-4 shrink-0 items-center justify-center text-icon-placeholder [&>svg]:size-full",
              "group-active/nav-item:text-icon-primary group-data-active/nav-item:text-icon-primary",
              "group-disabled/nav-item:text-icon-disabled group-aria-disabled/nav-item:text-icon-disabled",
            )}
          >
            {inlineStartNode}
          </span>
        ) : null}
        <span className="min-w-0 flex-1 truncate leading-snug font-medium">{children}</span>
        {inlineEndNode ? (
          <span className="flex shrink-0 items-center gap-2">{inlineEndNode}</span>
        ) : null}
      </>
    ),
  };

  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps(props, defaultProps),
    state: { active },
    stateAttributesMapping: {
      active: (value) => (value ? { "data-active": "" } : null),
    },
  });
}
