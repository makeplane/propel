import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { type VariantProps } from "class-variance-authority";

import { contextMenuItemVariants } from "./variants";

type ContextMenuLinkItemTone = NonNullable<VariantProps<typeof contextMenuItemVariants>["tone"]>;

export type ContextMenuLinkItemProps = Omit<
  BaseContextMenu.LinkItem.Props,
  "className" | "style"
> & {
  /** Color palette for the row. `neutral` for standard links; `danger` for destructive ones. */
  tone: ContextMenuLinkItemTone;
};

/** A navigational `<a>` menu row. Wraps `ContextMenu.LinkItem` 1:1. */
export function ContextMenuLinkItem({ tone, ...props }: ContextMenuLinkItemProps) {
  return <BaseContextMenu.LinkItem className={contextMenuItemVariants({ tone })} {...props} />;
}
