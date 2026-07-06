import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { BreadcrumbTrigger } from "../../elements/breadcrumb";
import { DisclosureIndicator } from "../../internal/disclosure-indicator";

export type BreadcrumbMenuTriggerProps = Omit<
  BaseMenu.Trigger.Props,
  "children" | "className" | "style"
> & {
  /** Leading element, typically `<Icon icon={...} tint="tertiary" magnitude="md" />`. */
  icon?: React.ReactNode;
  /** The crumb label. */
  label?: React.ReactNode;
};

/** The crumb that opens a `BreadcrumbMenu`. */
export function BreadcrumbMenuTrigger({ icon, label, ...props }: BreadcrumbMenuTriggerProps) {
  return (
    <BaseMenu.Trigger render={<BreadcrumbTrigger group />} {...props}>
      {icon}
      {label}
      <DisclosureIndicator motion="disclose" tint="tertiary" magnitude="sm">
        <ChevronDown />
      </DisclosureIndicator>
    </BaseMenu.Trigger>
  );
}
