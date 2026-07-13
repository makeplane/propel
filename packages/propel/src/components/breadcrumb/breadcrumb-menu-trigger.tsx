import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { BreadcrumbTrigger, BreadcrumbTriggerIndicator } from "../../elements/breadcrumb";

export type BreadcrumbMenuTriggerProps = Omit<
  BaseMenu.Trigger.Props,
  "children" | "className" | "style"
> & {
  /** Leading element, typically `<Icon icon={...} tint="tertiary" magnitude="md" />`. */
  icon?: React.ReactNode;
  /** The crumb label. */
  label?: string;
};

/** The crumb that opens a `BreadcrumbMenu`. */
export function BreadcrumbMenuTrigger({ icon, label, ...props }: BreadcrumbMenuTriggerProps) {
  return (
    <BaseMenu.Trigger render={<BreadcrumbTrigger group />} {...props}>
      {icon}
      {label}
      <BreadcrumbTriggerIndicator>
        <ChevronDown />
      </BreadcrumbTriggerIndicator>
    </BaseMenu.Trigger>
  );
}
