import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { comboboxChipOverflowVariants } from "./variants";

export type ComboboxChipOverflowProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The "+N more" count shown after the visible chips when the multiselect frame collapses (its
 * `layout="collapse"` and the selection exceeds the ready-made's `maxVisible`). A muted,
 * non-interactive caption — the hidden values stay managed from the popup. Base-UI-agnostic.
 */
export function ComboboxChipOverflow({ render, ...props }: ComboboxChipOverflowProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: comboboxChipOverflowVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
