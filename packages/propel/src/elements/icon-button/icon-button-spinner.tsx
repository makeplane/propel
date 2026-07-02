import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { iconButtonSpinnerVariants } from "./variants";

export type IconButtonSpinnerProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The loading indicator shown in place of the icon while the button is busy. A single spinning
 * glyph sized to the root's inherited `--node-size`. Decorative (the root carries `aria-busy`), so
 * it is `aria-hidden`. Bakes no glyph — pass the spinner as `children` (the ready-made `IconButton`
 * passes a `LoaderCircle`). Base-UI-agnostic.
 */
export function IconButtonSpinner({ render, ...props }: IconButtonSpinnerProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: iconButtonSpinnerVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
