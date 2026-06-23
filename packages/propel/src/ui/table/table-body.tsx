import type * as React from "react";

import { tableBodyVariants } from "./variants";

export type TableBodyProps = Omit<React.ComponentProps<"tbody">, "className" | "style">;

/** Body section (`<tbody>`). Holds the data `TableRow`s. */
export function TableBody(props: TableBodyProps) {
  return <tbody className={tableBodyVariants()} {...props} />;
}
