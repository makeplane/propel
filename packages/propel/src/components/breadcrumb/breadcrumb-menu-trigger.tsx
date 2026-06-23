import { Menu } from "@base-ui/react/menu";
import { ChevronRight } from "lucide-react";
import type * as React from "react";

import { BreadcrumbTrigger } from "../../ui/breadcrumb";
import { crumbMenuTriggerIconSlotVariants, crumbMenuTriggerIndicatorVariants } from "./variants";

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
        <span aria-hidden className={crumbMenuTriggerIconSlotVariants()}>
          {icon}
        </span>
      ) : null}
      {children}
      <ChevronRight aria-hidden className={crumbMenuTriggerIndicatorVariants()} />
    </Menu.Trigger>
  );
}
