import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { breadcrumbLinkVariants } from "./variants";

export type BreadcrumbLinkProps = Omit<useRender.ComponentProps<"a">, "className" | "style">;

/** A navigable crumb — an anchor styled as a hoverable pill. Pass `render` to use a router link. */
export function BreadcrumbLink({ render, ...props }: BreadcrumbLinkProps) {
  const defaultProps: useRender.ElementProps<"a"> = { className: breadcrumbLinkVariants() };
  return useRender({ defaultTagName: "a", render, props: mergeProps(defaultProps, props) });
}
