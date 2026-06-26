import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toggleIconVariants } from "./variants";

export type ToggleIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The icon slot inside a `Toggle`. Sizes its single child to the toggle's `--node-size` (set by the
 * toggle's `magnitude`), so callers pass a bare icon with no sizing class. Decorative (the `Toggle`
 * carries the accessible name via `aria-label`), so it is `aria-hidden`.
 */
export function ToggleIcon({ render, ...props }: ToggleIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: toggleIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
