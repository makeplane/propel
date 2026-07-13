import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Ellipsis } from "lucide-react";
import type * as React from "react";

import { BreadcrumbTrigger } from "../../elements/breadcrumb";
import { Icon as IconSlot } from "../../internal/icon";

export type BreadcrumbEllipsisTriggerProps = Omit<
  BaseMenu.Trigger.Props,
  "className" | "style" | "children"
> & {
  /** Accessible name for the trigger (e.g. "Show more breadcrumbs"). Required (icon-only). */
  "aria-label": string;
  /** The trigger element. @default an ellipsis */
  icon?: React.ReactNode;
};

/**
 * The icon-only crumb standing in for collapsed crumbs — grafts Base UI's `Menu.Trigger` onto the
 * styled `BreadcrumbTrigger`, with an ellipsis glyph by default (defaults are a `components`
 * concern). Unlike `BreadcrumbMenuTrigger` it carries no label and no chevron indicator: a
 * `BreadcrumbSeparator` follows it in the trail. Place a `MenuContent` of the hidden crumbs as its
 * sibling inside a `Menu`.
 */
export function BreadcrumbEllipsisTrigger({ icon, ...props }: BreadcrumbEllipsisTriggerProps) {
  return (
    <BaseMenu.Trigger render={<BreadcrumbTrigger />} {...props}>
      {icon ?? (
        <IconSlot tint="tertiary">
          <Ellipsis />
        </IconSlot>
      )}
    </BaseMenu.Trigger>
  );
}
