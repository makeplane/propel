import { Check, Minus } from "lucide-react";

export function CheckboxGlyph({ indeterminate }: { indeterminate?: boolean }) {
  return indeterminate ? (
    <Minus aria-hidden className="size-3" />
  ) : (
    <Check aria-hidden className="size-3" />
  );
}
