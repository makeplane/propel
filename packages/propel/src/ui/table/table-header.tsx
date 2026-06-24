import type * as React from "react";

import { tableHeaderVariants } from "./variants";

export type TableHeaderProps = Omit<React.ComponentProps<"thead">, "className" | "style">;

/** Header section (`<thead>`). Holds a single `TableRow` of `TableHead` cells. */
export function TableHeader(props: TableHeaderProps) {
  return <thead className={tableHeaderVariants()} {...props} />;
}
