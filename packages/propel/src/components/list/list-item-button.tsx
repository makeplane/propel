import type * as React from "react";

import { CompositeItem, type CompositeItemProps } from "../../base/composite";
import { ListItemButton as ListItemButtonElement } from "../../elements/list/list-item-button";
import { ListItemLabel } from "../../elements/list/list-item-label";

export type ListItemButtonProps = Omit<
  CompositeItemProps,
  "children" | "className" | "style" | "tag" | "render"
> & {
  /** Element rendered before the label, usually `<Icon icon={...} />`. */
  icon?: React.ReactNode;
  /** Visible row label. */
  label: React.ReactNode;
};

/**
 * A list row's primary action — a `<button>` that is also a roving `Composite` item. Base UI's
 * `CompositeItem` roving behavior grafted onto the styled `elements` `ListItemButton` element (rule
 * 1a). Pass `icon` for the leading visual and `label` for the visible row text.
 */
export function ListItemButton({ icon, label, ...props }: ListItemButtonProps) {
  return (
    <CompositeItem tag="button" {...props} render={<ListItemButtonElement />}>
      {icon}
      <ListItemLabel>{label}</ListItemLabel>
    </CompositeItem>
  );
}
