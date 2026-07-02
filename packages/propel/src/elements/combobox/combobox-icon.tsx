import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { comboboxIconVariants } from "./variants";

export type ComboboxIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The decorative leading icon at the input group's inline-start (e.g. a search magnifier). A
 * styled, `aria-hidden` `<span>` that sizes its single child to the group's `--node-size`.
 * Base-UI-agnostic.
 */
export function ComboboxIcon({ render, ...props }: ComboboxIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: comboboxIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
