import * as React from "react";

import { dialogHeaderVariants } from "./variants";

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * The top region of the dialog popup. Lays out its children (typically a `DialogTitle` group and an
 * optional close `IconButton`) in a row with space between. Padding is baked in; margin and
 * positioning are provided by the parent `DialogPopup` via its `gap`.
 */
export function DialogHeader({ ...props }: DialogHeaderProps) {
  return <div className={dialogHeaderVariants()} {...props} />;
}
