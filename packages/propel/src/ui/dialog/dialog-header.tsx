import * as React from "react";

import { dialogHeaderVariants } from "./variants";

export type DialogHeaderProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> & {
  /** The header's contents — typically a `DialogHeading` and an optional close `IconButton`. */
  children?: React.ReactNode;
};

/**
 * The top region of the dialog popup. Lays out a `DialogHeading` (title + optional description) at
 * the inline-start and an optional close `IconButton` at the inline-end. Padding is baked in; the
 * spacing to the body/actions is provided by the parent `DialogPopup` via its `gap`.
 */
export function DialogHeader(props: DialogHeaderProps) {
  return <div className={dialogHeaderVariants()} {...props} />;
}
