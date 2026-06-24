import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { VariantProps } from "class-variance-authority";

import { formBodyVariants } from "./variants";

type FormBodyVariantProps = Required<VariantProps<typeof formBodyVariants>>;

export type FormBodyProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  FormBodyVariantProps;

/**
 * The field-stacking region of a form. Fields stack with a consistent gap (always the same); the
 * `layout` axis selects single-column (`"single"`) or a wrapping multi-column (`"multi"`)
 * arrangement.
 */
export function FormBody({ layout, render, ...props }: FormBodyProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: formBodyVariants({ layout }) };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
