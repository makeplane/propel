import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";

/**
 * The shared overlay caret, grafted onto any Base UI `*.Arrow` behavior in `components`
 * (`<BaseMenu.Arrow render={<Arrow />}>`). Tints the caret to `layer-1` so it blends into the popup
 * surface; Base UI (and the arrow's children) supply the caret shape itself. Byte-identical across
 * every overlay family that draws a caret — `context-menu`, `menu`, `preview-card` — so it lives
 * here rather than being copied per family (rule 4a).
 */
export const arrowVariants = cva("text-layer-1");

export type ArrowProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

export function Arrow({ render, ...props }: ArrowProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: arrowVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
