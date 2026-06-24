import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { type VariantProps } from "class-variance-authority";

import { contextMenuItemVariants } from "./variants";

type ContextMenuItemTone = NonNullable<VariantProps<typeof contextMenuItemVariants>["tone"]>;

export type ContextMenuItemProps = Omit<BaseContextMenu.Item.Props, "className" | "style"> & {
  /** Color palette for the row. `neutral` for standard actions; `danger` for destructive ones. */
  tone: ContextMenuItemTone;
};

/** An interactive menu row. Wraps `ContextMenu.Item` 1:1. */
export function ContextMenuItem({ tone, ...props }: ContextMenuItemProps) {
  return <BaseContextMenu.Item className={contextMenuItemVariants({ tone })} {...props} />;
}
