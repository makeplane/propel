import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { navItemCountVariants } from "./variants";

export type NavItemCountProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** A small count chip for a nav row's inline-end slot. */
export function NavItemCount({ render, ...props }: NavItemCountProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: navItemCountVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
