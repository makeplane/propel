import type * as React from "react";

export function PillLabel({ children }: { children: React.ReactNode }) {
  return <span className="min-w-0 truncate">{children}</span>;
}
