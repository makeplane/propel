import { Check, Minus } from "lucide-react";

/**
 * The mark drawn inside a checked / indeterminate box: a checkmark, or a horizontal dash when
 * `indeterminate`. Decorative (the Root carries the a11y state). Renders a single bare icon — its
 * size comes from the enclosing `CheckboxIndicator` slot (`--node-size`), never baked in here.
 */
export function CheckboxGlyph({ indeterminate }: { indeterminate?: boolean }) {
  return indeterminate ? <Minus aria-hidden /> : <Check aria-hidden />;
}
