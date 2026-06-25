import type * as React from "react";

import { drawerFooterVariants } from "./variants";

export type DrawerFooterProps = Omit<
  React.ComponentPropsWithoutRef<"footer">,
  "className" | "style"
> & {
  /** The footer's action buttons, laid out at the inline-end. */
  children?: React.ReactNode;
};

/** The drawer's footer actions region (the Figma footer). Lays its actions at the inline-end. */
export function DrawerFooter(props: DrawerFooterProps) {
  return <footer className={drawerFooterVariants()} {...props} />;
}
