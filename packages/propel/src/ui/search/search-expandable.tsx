import type * as React from "react";

import { searchExpandableVariants, type SearchExpandableVariantProps } from "./variants";

export type SearchExpandableProps = Omit<
  React.ComponentPropsWithoutRef<"label">,
  "className" | "style"
> &
  SearchExpandableVariantProps;

/**
 * The expandable search box: a `<label>` that renders as a magnifier square and expands from the
 * inline-end edge while focused or filled. Set `data-expanded` to drive the open state. Lives
 * inside a `SearchExpandableViewport` and wraps the same `SearchIcon` / `SearchInput` parts and a
 * trailing clear `IconButton` as `Search`.
 */
export function SearchExpandable({ magnitude, ...props }: SearchExpandableProps) {
  return <label className={searchExpandableVariants({ magnitude })} {...props} />;
}
