import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import { formBodyVariants } from "./variants";

type FormBodyVariantProps = Required<VariantProps<typeof formBodyVariants>>;

export type FormBodyProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style"> &
  FormBodyVariantProps;

/**
 * The field-stacking region of a form. Fields stack with a consistent gap (always the same); the
 * `layout` axis selects single-column (`"single"`) or a wrapping multi-column (`"multi"`)
 * arrangement.
 */
export function FormBody({ layout, ...props }: FormBodyProps) {
  return <div className={formBodyVariants({ layout })} {...props} />;
}
