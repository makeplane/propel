import { Menu } from "@base-ui/react/menu";
import type * as React from "react";

export type DropdownLabelProps = Omit<
  React.ComponentProps<typeof Menu.GroupLabel>,
  "className" | "style"
> & {
  /** Optional inline-end content on the heading row. */
  inlineEndNode?: React.ReactNode;
  children?: React.ReactNode;
};

/** A non-interactive section heading for a group of menu items. */
export function DropdownLabel({ inlineEndNode, children, ...props }: DropdownLabelProps) {
  return (
    <Menu.GroupLabel
      className="flex items-center gap-1.5 px-2 py-1.5 text-12 text-tertiary"
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {inlineEndNode != null ? <span className="shrink-0">{inlineEndNode}</span> : null}
    </Menu.GroupLabel>
  );
}
