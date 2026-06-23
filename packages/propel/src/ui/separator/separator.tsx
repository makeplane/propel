import { Separator as BaseSeparator } from "@base-ui/react/separator";

import { separatorVariants } from "./variants";

export type SeparatorProps = Omit<BaseSeparator.Props, "className" | "style"> & {
  /**
   * Whether the separator is purely decorative (visually present but hidden from assistive
   * technology). Pass `true` for visual-only dividers; omit or pass `false` for separators that
   * mark a meaningful content boundary and should be announced to screen readers.
   *
   * Corresponds to the designer's "Role" axis (always-adjustable per the design spec).
   */
  decorative?: boolean;
};

/**
 * A thin rule that visually divides content. Orientation (`"horizontal"` | `"vertical"`) is
 * required — make a conscious choice rather than relying on a silent default. Pass `decorative` to
 * suppress the separator from assistive technology when it is purely visual. Base UI sets
 * `role="separator"` and `aria-orientation` automatically; `decorative` overrides both.
 *
 * Maps 1:1 to Base UI's `Separator` with propel's vocabulary applied.
 */
export function Separator({ decorative, ...props }: SeparatorProps) {
  return (
    <BaseSeparator
      className={separatorVariants()}
      role={decorative ? "none" : undefined}
      aria-hidden={decorative ? true : undefined}
      {...props}
    />
  );
}
