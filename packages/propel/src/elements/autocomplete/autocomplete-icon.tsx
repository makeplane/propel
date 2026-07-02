import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { autocompleteIconVariants } from "./variants";

export type AutocompleteIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The decorative leading icon at the input group's inline-start (e.g. a search magnifier). A
 * styled, `aria-hidden` `<span>` that sizes its single child to the group's `--node-size`.
 * Base-UI-agnostic.
 */
export function AutocompleteIcon({ render, ...props }: AutocompleteIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: autocompleteIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
