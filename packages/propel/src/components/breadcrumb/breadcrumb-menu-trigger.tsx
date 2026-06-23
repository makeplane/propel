import { Menu } from "@base-ui/react/menu";
import type * as React from "react";

import {
  BreadcrumbTrigger,
  BreadcrumbTriggerIcon,
  BreadcrumbTriggerIndicator,
} from "../../ui/breadcrumb";

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
      {icon != null ? <BreadcrumbTriggerIcon>{icon}</BreadcrumbTriggerIcon> : null}
      {children}
      <BreadcrumbTriggerIndicator />
    </Menu.Trigger>
  );
}
