import { Menu } from "@base-ui/react/menu";
import { Ellipsis } from "lucide-react";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { BreadcrumbTrigger } from "../../ui/breadcrumb";
import { MenuContent } from "../menu/index";

export type BreadcrumbDropdownProps = Omit<Menu.Trigger.Props, "className" | "style"> & {
  /** The collapsed crumbs shown in the menu. */
  children?: React.ReactNode;
  /** Accessible name for the trigger. Defaults to "Show more breadcrumbs". */
  label?: string;
};

/** A collapsed/overflow crumb that opens a menu of hidden crumbs. */
export function BreadcrumbDropdown({
  children,
  label = "Show more breadcrumbs",
  ...props
}: BreadcrumbDropdownProps) {
  return (
    <Menu.Root>
      <Menu.Trigger aria-label={label} render={<BreadcrumbTrigger />} {...props}>
        <NodeSlot aria-hidden>
          <Ellipsis />
        </NodeSlot>
      </Menu.Trigger>
      <MenuContent width="auto">{children}</MenuContent>
    </Menu.Root>
  );
}
