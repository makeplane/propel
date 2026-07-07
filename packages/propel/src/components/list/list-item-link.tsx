import type * as React from "react";

import { CompositeItem, type CompositeItemProps } from "../../base/composite";
import { ListItemLabel } from "../../elements/list/list-item-label";
import { ListItemLink as ListItemLinkElement } from "../../elements/list/list-item-link";

export type ListItemLinkProps = Omit<
  CompositeItemProps,
  "children" | "className" | "style" | "tag" | "render"
> & {
  /** Element rendered before the label, usually `<Icon icon={...} />`. */
  icon?: React.ReactNode;
  /** Visible row label. */
  label: string;
};

/**
 * A list row's primary navigation target — an `<a>` that is also a roving `Composite` item. Base
 * UI's `CompositeItem` roving behavior grafted onto the styled `elements` `ListItemLink` element
 * (rule 1a). Mark the current page with `aria-current="page"`. Pass `icon` for the leading visual
 * and `label` for the visible row text.
 */
export function ListItemLink({ icon, label, ...props }: ListItemLinkProps) {
  return (
    <CompositeItem tag="a" {...props} render={<ListItemLinkElement />}>
      {icon}
      <ListItemLabel>{label}</ListItemLabel>
    </CompositeItem>
  );
}
