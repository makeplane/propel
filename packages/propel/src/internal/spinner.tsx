import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "./node-slot";

/**
 * The shared pending-state glyph slot (rule 4a): an `aria-hidden` spinning `<span>` sizing its
 * single svg child (pass a `LoaderCircle`) to the inherited `--node-size`. Replaces the
 * byte-identical Button/AnchorButton/IconButton/Pill spinner parts.
 */
export const spinnerVariants = cva(cx(nodeSlotClass, "animate-spin"));

export type SpinnerProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

export function Spinner({ render, ...props }: SpinnerProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: spinnerVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
