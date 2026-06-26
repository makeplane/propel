import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { searchIconVariants } from "./variants";

export type SearchIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The decorative leading magnifier at the box's inline-start. Sizes its single child to the box's
 * `--node-size`, so callers pass a bare icon. Decorative (the input carries the accessible name),
 * so it is `aria-hidden`.
 */
export function SearchIcon({ render, ...props }: SearchIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: searchIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
