import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ChevronRight } from "lucide-react";
import type * as React from "react";

import {
  BreadcrumbTrigger,
  BreadcrumbTriggerIcon,
  BreadcrumbTriggerIndicator,
} from "../../elements/breadcrumb";

export type BreadcrumbMenuTriggerProps = Omit<BaseMenu.Trigger.Props, "className" | "style"> & {
  /** Leading content, typically a work-item/page icon. */
  icon?: React.ReactNode;
  /** The crumb label. */
  children?: React.ReactNode;
};

/** The crumb that opens a `BreadcrumbMenu`. */
export function BreadcrumbMenuTrigger({ icon, children, ...props }: BreadcrumbMenuTriggerProps) {
  return (
    <BaseMenu.Trigger render={<BreadcrumbTrigger group />} {...props}>
      {icon != null ? <BreadcrumbTriggerIcon>{icon}</BreadcrumbTriggerIcon> : null}
      {children}
      <BreadcrumbTriggerIndicator>
        <ChevronRight />
      </BreadcrumbTriggerIndicator>
    </BaseMenu.Trigger>
  );
}
