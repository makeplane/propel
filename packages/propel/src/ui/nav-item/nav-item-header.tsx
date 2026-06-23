import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type * as React from "react";

import {
  navItemHeaderActionClass,
  navItemHeaderChevronClass,
  navItemHeaderLabelClass,
  navItemHeaderToggleClass,
  navItemHeaderVariants,
} from "./variants";

export type NavItemHeaderProps = Omit<
  BaseCollapsible.Trigger.Props,
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
    <div className={navItemHeaderVariants()}>
      <BaseCollapsible.Trigger {...props} type="button" className={navItemHeaderToggleClass}>
        <span className={navItemHeaderLabelClass}>{children}</span>
        <span aria-hidden className={navItemHeaderChevronClass}>
          {chevron}
        </span>
      </BaseCollapsible.Trigger>
      {inlineEndNode != null ? (
        <span className={navItemHeaderActionClass}>{inlineEndNode}</span>
      ) : null}
    </div>
  );
}
