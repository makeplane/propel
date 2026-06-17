import { Menu } from "@base-ui/react/menu";
import { cx } from "class-variance-authority";
import { ChevronRight } from "lucide-react";
import type * as React from "react";

import { crumbVariants } from "./breadcrumb-context";

export type BreadcrumbMenuTriggerProps = Omit<
  React.ComponentProps<typeof Menu.Trigger>,
  "className" | "render" | "style"
> & {
  /** Leading content, typically a work-item/page icon. */
  icon?: React.ReactNode;
  /** The crumb label. */
  children?: React.ReactNode;
};

/** The crumb that opens a `BreadcrumbMenu`. */
export function BreadcrumbMenuTrigger({ icon, children, ...props }: BreadcrumbMenuTriggerProps) {
  return (
    <Menu.Trigger
      className={cx(
        crumbVariants({ interactive: true }),
        "group/trigger cursor-default data-popup-open:bg-layer-transparent-hover data-popup-open:text-primary",
      )}
      {...props}
    >
      {icon != null ? (
        <span className="flex size-4 shrink-0 items-center justify-center text-icon-tertiary">
          {icon}
        </span>
      ) : null}
      {children}
      <ChevronRight
        className="size-3.5 shrink-0 text-icon-tertiary transition-transform group-data-popup-open/trigger:rotate-90 rtl:not-group-data-popup-open/trigger:-scale-x-100"
        aria-hidden="true"
      />
    </Menu.Trigger>
  );
}
