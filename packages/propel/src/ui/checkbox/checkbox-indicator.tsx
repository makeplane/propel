import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import type * as React from "react";

export type CheckboxIndicatorProps = Omit<
  React.ComponentProps<typeof BaseCheckbox.Indicator>,
  "className" | "style"
>;

/**
 * The mark shown inside a checked / indeterminate `Checkbox`. Only mounted while checked or
 * indeterminate (no `keepMounted`), so the box is empty when unchecked. Decorative — the Root
 * carries the a11y state. Children — typically a `CheckboxGlyph` — are passed through.
 */
export function CheckboxIndicator({ children, ...props }: CheckboxIndicatorProps) {
  return (
    <BaseCheckbox.Indicator className="flex items-center justify-center" {...props}>
      {children}
    </BaseCheckbox.Indicator>
  );
}
