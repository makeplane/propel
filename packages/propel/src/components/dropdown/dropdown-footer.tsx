import type * as React from "react";

export type DropdownFooterProps = Omit<React.ComponentProps<"div">, "className" | "style">;

/** A non-interactive footer pinned below a `DropdownContent` menu popup. */
export function DropdownFooter(props: DropdownFooterProps) {
  return (
    <div
      className="shrink-0 border-t border-subtle bg-layer-2 px-3 py-2 text-12 text-tertiary"
      {...props}
    />
  );
}
