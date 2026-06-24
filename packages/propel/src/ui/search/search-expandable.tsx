import type * as React from "react";

import { searchExpandableVariants, type SearchMagnitude } from "./variants";

export type SearchExpandableProps = Omit<
  React.ComponentPropsWithoutRef<"label">,
  "className" | "style"
> & {
  /** Height + text + icon scale (Figma 28/32/36px steps). */
  magnitude: SearchMagnitude;
};

/**
 * The expandable search box: a `<label>` that renders as a magnifier square and expands from the
 * inline-end edge while focused or filled. Set `data-expanded` to drive the open state. Lives
 * inside a `SearchExpandableViewport` and wraps the same `SearchIcon` / `SearchInput` /
 * `SearchClear` parts as `Search`.
 */
export function SearchExpandable({ magnitude, ...props }: SearchExpandableProps) {
  return <label className={searchExpandableVariants({ magnitude })} {...props} />;
}
