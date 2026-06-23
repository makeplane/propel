import { Search } from "lucide-react";
import type * as React from "react";

import { menuSearchIconVariants } from "./variants";

export type MenuSearchIconProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The leading magnifier glyph inside `MenuSearch`. Sizes its single child; decorative, so it is
 * `aria-hidden`. Defaults to a magnifier; pass `children` to use a different glyph.
 */
export function MenuSearchIcon({ children, ...props }: MenuSearchIconProps) {
  return (
    <span aria-hidden className={menuSearchIconVariants()} {...props}>
      {children ?? <Search />}
    </span>
  );
}
