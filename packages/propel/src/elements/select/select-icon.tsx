import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { selectIconVariants } from "./variants";

export type SelectIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The trailing chevron slot inside a trigger. Renders whatever svg you pass as `children` (sized to
 * the trigger's `--node-size`). A decorative, `aria-hidden` `<span>` — the trigger carries the a11y
 * state. Base-UI-agnostic.
 */
export function SelectIcon({ render, ...props }: SelectIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: selectIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
