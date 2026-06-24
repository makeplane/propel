import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { type VariantProps } from "class-variance-authority";

import { contextMenuItemVariants } from "./variants";

type ContextMenuRadioItemTone = NonNullable<VariantProps<typeof contextMenuItemVariants>["tone"]>;

export type ContextMenuRadioItemProps = Omit<
  BaseContextMenu.RadioItem.Props,
  "className" | "style"
> & {
  /** Color palette for the row. `neutral` for standard selections; `danger` for destructive ones. */
  tone: ContextMenuRadioItemTone;
};

/** A menu row that behaves like a radio button. Wraps `ContextMenu.RadioItem` 1:1. */
export function ContextMenuRadioItem({ tone, ...props }: ContextMenuRadioItemProps) {
  return <BaseContextMenu.RadioItem className={contextMenuItemVariants({ tone })} {...props} />;
}
