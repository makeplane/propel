import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { breadcrumbItemVariants } from "./variants";

export type BreadcrumbItemProps = Omit<useRender.ComponentProps<"li">, "className" | "style">;

/** One step in the trail: a list item holding a link, page, or menu crumb. */
export function BreadcrumbItem({ render, ...props }: BreadcrumbItemProps) {
  const defaultProps: useRender.ElementProps<"li"> = { className: breadcrumbItemVariants() };
  return useRender({ defaultTagName: "li", render, props: mergeProps(defaultProps, props) });
}
