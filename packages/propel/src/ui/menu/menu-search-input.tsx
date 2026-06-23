import type * as React from "react";

import { menuSearchInputVariants } from "./variants";

export type MenuSearchInputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "className" | "style"
>;

/**
 * The borderless text field inside `MenuSearch`. Stops keydown from bubbling so typing does not
 * trigger the menu's own type-ahead navigation.
 */
export function MenuSearchInput({ onKeyDown, ...props }: MenuSearchInputProps) {
  return (
    <input
      className={menuSearchInputVariants()}
      onKeyDown={(event) => {
        event.stopPropagation();
        onKeyDown?.(event);
      }}
      {...props}
    />
  );
}
