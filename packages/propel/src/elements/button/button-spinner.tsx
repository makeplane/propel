import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { buttonSpinnerVariants } from "./variants";

export type ButtonSpinnerProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The loading indicator shown in place of the inline-start node while the button is busy. A pure
 * slot: it sizes its single child to the button's `--node-size` and spins it via `animate-spin`,
 * but bakes no glyph — callers pass the spinner icon as `children`. Decorative (the root carries
 * `aria-busy`), so it is `aria-hidden`. Base-UI-agnostic.
 */
export function ButtonSpinner({ render, ...props }: ButtonSpinnerProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: buttonSpinnerVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
