import { Menu } from "@base-ui/react/menu";
import { ChevronRight } from "lucide-react";
import type * as React from "react";

import { BreadcrumbTrigger } from "../../ui/breadcrumb";

export type BreadcrumbMenuTriggerProps = Omit<Menu.Trigger.Props, "className" | "style"> & {
  /** Leading content, typically a work-item/page icon. */
  icon?: React.ReactNode;
  /** The crumb label. */
  children?: React.ReactNode;
};

/** The crumb that opens a `BreadcrumbMenu`. */
export function BreadcrumbMenuTrigger({ icon, children, ...props }: BreadcrumbMenuTriggerProps) {
  return (
    <Menu.Trigger render={<BreadcrumbTrigger group />} {...props}>
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
