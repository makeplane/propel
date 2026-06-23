import * as React from "react";

import { dialogBodyVariants } from "./variants";

export type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * The scrollable main content region of the dialog popup. Grows to fill available space and scrolls
 * vertically when content exceeds the popup's max-height. Side padding is baked in. Pass any
 * content — plain text, form fields, lists — as children.
 */
export function DialogBody({ ...props }: DialogBodyProps) {
  return <div className={dialogBodyVariants()} {...props} />;
}
