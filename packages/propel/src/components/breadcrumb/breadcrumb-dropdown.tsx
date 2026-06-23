import { Menu } from "@base-ui/react/menu";
import { Ellipsis } from "lucide-react";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";
import { OverlayPanel } from "../../internal/overlay-panel";
import { BreadcrumbTrigger } from "../../ui/breadcrumb";
import { crumbDropdownPopupVariants } from "./variants";

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
      <Menu.Portal>
        <Menu.Positioner side="bottom" align="start" sideOffset={4}>
          <OverlayPanel elevation="raised" radius="md" width="auto">
            <Menu.Popup className={crumbDropdownPopupVariants()}>{children}</Menu.Popup>
          </OverlayPanel>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
