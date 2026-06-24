import type * as React from "react";

import { searchExpandableViewportVariants, type SearchMagnitude } from "./variants";

export type SearchExpandableViewportProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> & {
  /** Collapsed-square size, matched to the box `magnitude`. */
  magnitude: SearchMagnitude;
};

/**
 * The positioning viewport for an expandable search. Reserves the collapsed magnifier square and
 * anchors the `SearchExpandable` box, so the icon stays on the inline-start as the box widens.
 */
export function SearchExpandableViewport({ magnitude, ...props }: SearchExpandableViewportProps) {
  return <div className={searchExpandableViewportVariants({ magnitude })} {...props} />;
}
