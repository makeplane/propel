import type * as React from "react";

import { searchClearVariants, type SearchMagnitude } from "./variants";

export type SearchClearProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className" | "style" | "type"
> & {
  /** Square size, matched to the box `magnitude`. */
  magnitude: SearchMagnitude;
};

/**
 * The trailing clear control at the box's inline-end, shown only while the field has a value. A
 * square `<button>` that sizes its single glyph child to the box's `--node-size`.
 */
export function SearchClear({ magnitude, ...props }: SearchClearProps) {
  return <button type="button" className={searchClearVariants({ magnitude })} {...props} />;
}
