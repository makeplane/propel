import { Menu as BaseMenu } from "@base-ui/react/menu";
import { type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { menuRowVariants } from "./variants";

type MenuItemVariant = NonNullable<VariantProps<typeof menuRowVariants>["variant"]>;
type MenuItemEmphasis = NonNullable<VariantProps<typeof menuRowVariants>["emphasis"]>;

export type MenuItemProps = Omit<
  React.ComponentProps<typeof BaseMenu.Item>,
  "className" | "style" | "label"
> & {
  /** Row layout. */
  variant: MenuItemVariant;
  /** Row emphasis. @default "default" */
  emphasis?: MenuItemEmphasis;
};

/** A selectable menu row. Wraps `Menu.Item` 1:1. */
export function MenuItem({ variant, emphasis = "default", children, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item className={menuRowVariants({ variant, emphasis })} {...props}>
      {children}
    </BaseMenu.Item>
  );
}
