import type * as React from "react";

import { fieldLabelRequiredMarkerVariants } from "./variants";

export type FieldLabelRequiredMarkerProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The required `*` marker shown after a `FieldLabel`'s text. Decorative (the control's `required`
 * attribute carries the semantics), so it is `aria-hidden`; defaults to an asterisk glyph.
 */
export function FieldLabelRequiredMarker({ children, ...props }: FieldLabelRequiredMarkerProps) {
  return (
    <span aria-hidden className={fieldLabelRequiredMarkerVariants()} {...props}>
      {children ?? "*"}
    </span>
  );
}
