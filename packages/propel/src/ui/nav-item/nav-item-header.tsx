import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { cx } from "class-variance-authority";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { navItemHeaderToggleClass } from "./nav-item-context";
import { navItemHeaderVariants } from "./variants";

export type NavItemHeaderProps = Omit<
  React.ComponentProps<typeof BaseCollapsible.Trigger>,
  "className" | "style" | "children"
> & {
  /** The section title. */
  children: React.ReactNode;
  /** The disclosure chevron glyph, sized to 16px. */
  chevron: React.ReactNode;
  /** Optional inline-end action. */
  inlineEndNode?: React.ReactNode;
};

/** A sidebar section header row. */
export function NavItemHeader({ children, chevron, inlineEndNode, ...props }: NavItemHeaderProps) {
  return (
    <div className={cx(navItemHeaderVariants(), "[--node-size:1rem]")}>
      <BaseCollapsible.Trigger
        {...props}
        type="button"
        className={cx(navItemHeaderToggleClass, "group/nav-item-header-toggle")}
      >
        <span className="min-w-0 truncate text-body-xs-semibold">{children}</span>
        <span
          aria-hidden
          className={cx(
            "flex size-4 shrink-0 items-center justify-center text-icon-secondary [&>svg]:size-full",
            "rotate-90 transition-transform group-data-panel-open/nav-item-header-toggle:rotate-0",
            "rtl:-rotate-90 rtl:group-data-panel-open/nav-item-header-toggle:rotate-0",
          )}
        >
          {chevron}
        </span>
      </BaseCollapsible.Trigger>
      {inlineEndNode != null ? (
        <NodeSlot className="text-icon-secondary">{inlineEndNode}</NodeSlot>
      ) : null}
    </div>
  );
}
