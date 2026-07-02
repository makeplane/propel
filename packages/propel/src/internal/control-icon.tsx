import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "./node-slot";

/**
 * The decorative leading icon inside a bordered control group (a search magnifier, a mail glyph):
 * an `aria-hidden` slot sized to the group's `--node-size`, tinted toward the placeholder and
 * brightening to secondary when the control focuses — reading the `group/control` class that
 * `controlGroupClass` carries. One part for every input frame (input-field, autocomplete,
 * combobox); before this, autocomplete and combobox each kept a copy differing only in their group
 * name, and the input's icons never brightened.
 */
export const controlIconVariants = cva(
  cx(
    nodeSlotClass,
    "text-icon-placeholder transition-colors group-focus-within/control:text-icon-secondary",
  ),
);

export type ControlIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

export function ControlIcon({ render, ...props }: ControlIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: controlIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
