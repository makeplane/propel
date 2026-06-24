import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { type VariantProps } from "class-variance-authority";

import { contextMenuItemVariants } from "./variants";

type ContextMenuCheckboxItemTone = NonNullable<
  VariantProps<typeof contextMenuItemVariants>["tone"]
>;

export type ContextMenuCheckboxItemProps = Omit<
  BaseContextMenu.CheckboxItem.Props,
  "className" | "style"
> & {
  /** Color palette for the row. `neutral` for standard toggles; `danger` for destructive ones. */
  tone: ContextMenuCheckboxItemTone;
};

/** A menu row that toggles a setting on or off. Wraps `ContextMenu.CheckboxItem` 1:1. */
export function ContextMenuCheckboxItem({ tone, ...props }: ContextMenuCheckboxItemProps) {
  return <BaseContextMenu.CheckboxItem className={contextMenuItemVariants({ tone })} {...props} />;
}
