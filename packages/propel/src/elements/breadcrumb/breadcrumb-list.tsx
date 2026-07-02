import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { breadcrumbListVariants } from "./variants";

export type BreadcrumbListProps = Omit<useRender.ComponentProps<"ol">, "className" | "style">;

/** The ordered list of crumbs inside a `Breadcrumb` landmark. */
export function BreadcrumbList({ render, ...props }: BreadcrumbListProps) {
  const defaultProps: useRender.ElementProps<"ol"> = { className: breadcrumbListVariants() };
  return useRender({ defaultTagName: "ol", render, props: mergeProps(defaultProps, props) });
}
