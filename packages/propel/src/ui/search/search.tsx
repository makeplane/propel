import type * as React from "react";

import { searchVariants, type SearchMagnitude } from "./variants";

export type SearchProps = Omit<React.ComponentPropsWithoutRef<"label">, "className" | "style"> & {
  /** Height + text + icon scale (Figma 28/32/36px steps). */
  magnitude: SearchMagnitude;
};

/**
 * The search field box: a `<label>` wrapping the leading `SearchIcon`, the `SearchInput`, and an
 * optional trailing `SearchClear`. Holds the border, radius, focus ring, and `--node-size` that
 * sizes the glyphs. Clicking anywhere in the box focuses the input.
 */
export function Search({ magnitude, ...props }: SearchProps) {
  return <label className={searchVariants({ magnitude })} {...props} />;
}
