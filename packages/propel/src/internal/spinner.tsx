import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "./node-slot";

/**
 * The shared pending-state glyph slot (rule 4a): an `aria-hidden` `<span>` sizing its single svg
 * child (pass a `LoaderCircle`) to the inherited `--node-size`. Replaces the byte-identical
 * Button/IconButton/Pill spinner parts.
 *
 * Two animations run on mount: the `--animate-spinner-expand` one-shot grows the slot from zero
 * width and fades it in (so a control entering its loading state widens smoothly instead of
 * snapping), while the perpetual `spin` rotates the glyph. They live on separate elements because
 * an element has a single `animation` slot: the expand owns the span, the spin owns the svg child.
 * `overflow-hidden` clips the glyph while the slot is still expanding.
 */
export const spinnerVariants = cva(
  cx(nodeSlotClass, "animate-spinner-expand overflow-hidden [&>svg]:animate-spin"),
);

export type SpinnerProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

export function Spinner({ render, ...props }: SpinnerProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: spinnerVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
