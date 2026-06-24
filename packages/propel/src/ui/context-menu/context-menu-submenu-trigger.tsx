import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { type VariantProps } from "class-variance-authority";

import { contextMenuSubmenuTriggerVariants } from "./variants";

type ContextMenuSubmenuTriggerTone = NonNullable<
  VariantProps<typeof contextMenuSubmenuTriggerVariants>["tone"]
>;

export type ContextMenuSubmenuTriggerProps = Omit<
  BaseContextMenu.SubmenuTrigger.Props,
  "className" | "style"
> & {
  /** Color palette for the row. `neutral` for standard submenus; `danger` for destructive ones. */
  tone: ContextMenuSubmenuTriggerTone;
};

/** The row that opens a submenu. Wraps `ContextMenu.SubmenuTrigger` 1:1. */
export function ContextMenuSubmenuTrigger({ tone, ...props }: ContextMenuSubmenuTriggerProps) {
  return (
    <BaseContextMenu.SubmenuTrigger
      className={contextMenuSubmenuTriggerVariants({ tone })}
      {...props}
    />
  );
}
