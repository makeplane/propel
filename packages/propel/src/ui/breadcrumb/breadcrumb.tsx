import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

export type BreadcrumbProps = Omit<useRender.ComponentProps<"nav">, "className" | "style">;

/** Breadcrumb trail landmark: a `<nav aria-label="Breadcrumb">` wrapping a `BreadcrumbList`. */
export function Breadcrumb({ render, ...props }: BreadcrumbProps) {
  const defaultProps: useRender.ElementProps<"nav"> = { "aria-label": "Breadcrumb" };
  return useRender({ defaultTagName: "nav", render, props: mergeProps(defaultProps, props) });
}
