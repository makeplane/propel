import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { autocompleteEmptyVariants } from "./variants";

export type AutocompleteEmptyProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled empty-state row. Graft in `components` via `<BaseAutocomplete.Empty
 * render={<AutocompleteEmpty/>} />`.
 */
export function AutocompleteEmpty({ render, ...props }: AutocompleteEmptyProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: autocompleteEmptyVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
