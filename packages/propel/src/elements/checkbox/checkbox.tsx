import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { checkboxVariants } from "./variants";

export type CheckboxProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The styled checkbox box. Base-UI-agnostic — graft the checkbox behavior in `components` via
 * `<BaseCheckbox.Root render={<Checkbox/>} />`. Base UI renders a `<span role="checkbox">` with
 * `aria-checked` (including `mixed` for indeterminate); the check/dash indicators pass through as
 * children. The danger look is a STATE, not a prop: inside an invalid `Field.Root`, Base UI
 * propagates `data-invalid` here and the box recolors its border to `danger`.
 */
export function Checkbox({ render, ...props }: CheckboxProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: checkboxVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
