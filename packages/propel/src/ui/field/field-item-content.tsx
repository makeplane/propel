import type * as React from "react";

import { fieldItemContentVariants } from "./variants";

export type FieldItemContentProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> & {
  /** The option's label and optional description. */
  children?: React.ReactNode;
};

/** The label + description column for a single choice option (checkbox/radio/switch row). */
export function FieldItemContent(props: FieldItemContentProps) {
  return <div className={fieldItemContentVariants()} {...props} />;
}
