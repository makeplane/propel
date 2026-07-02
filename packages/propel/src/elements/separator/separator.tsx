import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { separatorVariants } from "./variants";

export type SeparatorProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled divider rule — a Base-UI-agnostic `useRender` `<div>`. Its cva keys off the
 * `[data-orientation]` that Base UI's `Separator` behavior contributes when grafted in `components`
 * via `<BaseSeparator render={<Separator/>} />`; the semantic vs. decorative role is wired there
 * too. Spacing around the rule belongs to the surrounding layout, not the separator.
 */
export function Separator({ render, ...props }: SeparatorProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: separatorVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
