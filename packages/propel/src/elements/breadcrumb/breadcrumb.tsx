import { useRender } from "@base-ui/react/use-render";

export type BreadcrumbProps = Omit<
  useRender.ComponentProps<"nav">,
  "className" | "style" | "aria-label"
> & { "aria-label": string };

/**
 * Breadcrumb trail landmark: a `<nav>` wrapping a `BreadcrumbList`. Requires an `aria-label` (its
 * landmark name, conventionally "Breadcrumb") — the consumer supplies it so it can be localized.
 */
export function Breadcrumb({ render, ...props }: BreadcrumbProps) {
  // No cva: the nav is an unstyled semantic landmark; the trail's layout lives on BreadcrumbList
  // (the `<ol>`). With no default props there is nothing to merge, so `mergeProps` is unneeded too.
  return useRender({ defaultTagName: "nav", render, props });
}
