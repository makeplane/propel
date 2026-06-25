import type * as React from "react";

import { navigationMenuContentListVariants } from "./variants";

export type NavigationMenuContentListProps = Omit<
  React.ComponentPropsWithoutRef<"ul">,
  "className" | "style"
> & {
  /** The list items — each link wrapped in its own `<li>`. */
  children?: React.ReactNode;
};

/**
 * The vertical list of links inside a `NavigationMenuContent` panel. Stacks its items with a
 * consistent gap; the surrounding `NavigationMenuPopup` owns the padding. Renders a `<ul>`, so each
 * child link belongs in its own `<li>`.
 */
export function NavigationMenuContentList(props: NavigationMenuContentListProps) {
  return <ul className={navigationMenuContentListVariants()} {...props} />;
}
