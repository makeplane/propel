import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";

/**
 * The shared overlay positioner surface, grafted onto any Base UI `*.Positioner` behavior in
 * `components` (`<BaseMenu.Positioner render={<Positioner />}>`). Floats the anchored overlay above
 * page content and drops the focus ring. Byte-identical across every overlay family, so it lives
 * here rather than being copied per family (rule 4a).
 */
export const positionerVariants = cva("z-50 outline-none");

export type PositionerProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

export function Positioner({ render, ...props }: PositionerProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: positionerVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
