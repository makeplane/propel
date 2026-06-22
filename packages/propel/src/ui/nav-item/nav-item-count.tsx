import { cx } from "class-variance-authority";
import type * as React from "react";

/** A small count chip for a nav row's inline-end slot. */
export function NavItemCount(props: Omit<React.ComponentProps<"span">, "className" | "style">) {
  return (
    <span
      className={cx(
        "inline-flex min-w-4 items-center justify-center rounded-sm px-0.5",
        "bg-layer-3 text-11 leading-tight text-secondary",
      )}
      {...props}
    />
  );
}
