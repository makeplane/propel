import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { type VariantProps } from "class-variance-authority";
import type * as React from "react";

import {
  navItemIconClass,
  navItemLabelClass,
  navItemTrailingClass,
  navItemVariants,
} from "./variants";

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
          <span aria-hidden className={navItemIconClass}>
            {inlineStartNode}
          </span>
        ) : null}
        <span className={navItemLabelClass}>{children}</span>
        {inlineEndNode ? <span className={navItemTrailingClass}>{inlineEndNode}</span> : null}
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
