import type * as React from "react";

import {
  searchExpandableViewportVariants,
  type SearchExpandableViewportVariantProps,
} from "./variants";

export type SearchExpandableViewportProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> &
  SearchExpandableViewportVariantProps;

/**
 * The positioning viewport for an expandable search. Reserves the collapsed magnifier square and
 * anchors the `SearchExpandable` box, so the icon stays on the inline-start as the box widens.
 */
export function SearchExpandableViewport({ magnitude, ...props }: SearchExpandableViewportProps) {
  return <div className={searchExpandableViewportVariants({ magnitude })} {...props} />;
}
