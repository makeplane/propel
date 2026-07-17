import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { BreadcrumbTrigger, BreadcrumbTriggerIndicator } from "../../elements/breadcrumb";

export type BreadcrumbMenuTriggerProps = Omit<
  BaseMenu.Trigger.Props,
  "children" | "className" | "style" | "render"
> & {
  /**
   * Leading icon, e.g. `<Icon icon={Layers} tint="secondary" />` (renders 16×16 via the crumb's
   * `--node-size`).
   */
  icon?: React.ReactNode;
  /**
   * The crumb label. Required — it is the trigger's accessible name (the icon and caret are
   * decorative).
   */
  label: string;
};

/** The crumb that opens a `BreadcrumbMenu`. */
export function BreadcrumbMenuTrigger({ icon, label, ...props }: BreadcrumbMenuTriggerProps) {
  return (
    <BaseMenu.Trigger {...props} render={<BreadcrumbTrigger group />}>
      {icon}
      {label}
      <BreadcrumbTriggerIndicator>
        <ChevronDown />
      </BreadcrumbTriggerIndicator>
    </BaseMenu.Trigger>
  );
}
