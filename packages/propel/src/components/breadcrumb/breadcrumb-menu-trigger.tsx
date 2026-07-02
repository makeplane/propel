import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { BreadcrumbTrigger } from "../../elements/breadcrumb";
import { DisclosureIndicator } from "../../internal/disclosure-indicator";
import { Icon } from "../../internal/icon";

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
      {icon != null ? (
        <Icon tint="tertiary" magnitude="md">
          {icon}
        </Icon>
      ) : null}
      {children}
      <DisclosureIndicator motion="disclose" tint="tertiary" magnitude="sm">
        <ChevronDown />
      </DisclosureIndicator>
    </BaseMenu.Trigger>
  );
}
