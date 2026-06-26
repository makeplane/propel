import type * as React from "react";

import { fieldLabelRequiredMarkerVariants } from "./variants";

export type FieldLabelRequiredMarkerProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The required marker slot shown after a `FieldLabel`'s text. Decorative (the control's `required`
 * attribute carries the semantics), so it is `aria-hidden`. Bakes no glyph: pass the marker (e.g.
 * an asterisk) as `children`.
 */
export function FieldLabelRequiredMarker(props: FieldLabelRequiredMarkerProps) {
  return <span aria-hidden className={fieldLabelRequiredMarkerVariants()} {...props} />;
}
