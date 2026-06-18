import type * as React from "react";

export type MenuFooterProps = Omit<React.ComponentProps<"div">, "className" | "style">;

/** A non-interactive footer pinned below a `MenuContent` menu popup. */
export function MenuFooter(props: MenuFooterProps) {
  return (
    <div
      className="shrink-0 border-t border-subtle bg-layer-2 px-3 py-2 text-12 text-tertiary"
      {...props}
    />
  );
}
