import { Menu } from "@base-ui/react/menu";
import { cx } from "class-variance-authority";
import { Ellipsis } from "lucide-react";
import type * as React from "react";

import { OverlayPanel } from "../../internal/overlay-panel";
import { crumbVariants } from "./breadcrumb-context";

export type BreadcrumbDropdownProps = Omit<
  React.ComponentProps<typeof Menu.Trigger>,
  "className" | "render" | "style"
> & {
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
      <Menu.Trigger
        aria-label={label}
        className={cx(
          crumbVariants({ interactive: true }),
          "cursor-default data-popup-open:bg-layer-transparent-hover data-popup-open:text-primary",
        )}
        {...props}
      >
        <Ellipsis className="size-3.5" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side="bottom" align="start" sideOffset={4}>
          <OverlayPanel elevation="raised" radius="md" width="auto">
            <Menu.Popup className="p-1 outline-none">{children}</Menu.Popup>
          </OverlayPanel>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
