import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { autocompleteInputIconVariants } from "./variants";

export type AutocompleteInputIconProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The decorative leading icon at the input group's inline-start (e.g. a search magnifier). Sizes
 * its single child to the group's `--node-size`, so callers pass a bare icon. Decorative (the input
 * carries the accessible name), so it is `aria-hidden`.
 */
export function AutocompleteInputIcon({ render, ...props }: AutocompleteInputIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: autocompleteInputIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
