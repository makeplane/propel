import { cva, cx, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import type * as React from "react";

export const pillBase = cx(
  "inline-flex shrink-0 items-center justify-center rounded-md border-sm outline-none",
  "transition-colors focus-visible:ring-2 focus-visible:ring-accent-strong",
);

export const labelPillSize = cva(cx(pillBase, "max-w-[120px] gap-1 py-1 [--node-size:0.875rem]"), {
  variants: {
    magnitude: {
      sm: "h-5 px-1.5",
      md: "h-6 px-1.5",
      lg: "h-7 px-2",
    },
  },
});

export type PillMagnitude = NonNullable<VariantProps<typeof labelPillSize>["magnitude"]>;

export const labelFontByMagnitude: Record<PillMagnitude, string> = {
  sm: "text-12",
  md: "text-13",
  lg: "text-body-sm-regular",
};

export function PillSpinner() {
  return <LoaderCircle aria-hidden className="size-(--node-size) shrink-0 animate-spin" />;
}

export function PillLabel({ children }: { children: React.ReactNode }) {
  return <span className="min-w-0 truncate">{children}</span>;
}
