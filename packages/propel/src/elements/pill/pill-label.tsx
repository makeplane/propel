import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { pillLabelVariants } from "./variants";

export type PillLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The pill's single-line label. Shrinks and truncates instead of wrapping. When `children` is a
 * string, bakes a native `title` so hover recovers the full text past the 120px cap; pass `title`
 * explicitly to override (or `title=""` to suppress).
 */
export function PillLabel({ render, children, title, ...props }: PillLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: pillLabelVariants(),
    children,
    title: title !== undefined ? title : typeof children === "string" ? children : undefined,
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
