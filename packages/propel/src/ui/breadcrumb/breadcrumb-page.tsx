import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { breadcrumbPageVariants } from "./variants";

export type BreadcrumbPageProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** The current page — the last, non-navigable crumb. */
export function BreadcrumbPage({ render, ...props }: BreadcrumbPageProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-current": "page",
    className: breadcrumbPageVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
