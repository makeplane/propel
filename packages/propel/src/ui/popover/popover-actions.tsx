import type * as React from "react";

import { popoverActionsVariants } from "./variants";

/** Props for {@link PopoverActions}. */
export type PopoverActionsProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> & {
  /** The trailing controls (e.g. a `PopoverClose` styled as a `Button`). */
  children?: React.ReactNode;
};

/**
 * The popup's trailing controls row (e.g. a `PopoverClose` styled as a `Button`). Pushes its
 * children to the inline-end and spaces them by a gap. Sits as a child of `PopoverBody`.
 */
export function PopoverActions(props: PopoverActionsProps) {
  return <div className={popoverActionsVariants()} {...props} />;
}
