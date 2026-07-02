import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type AutocompleteInputVariantProps, autocompleteInputVariants } from "./variants";

export type AutocompleteInputProps = Omit<
  useRender.ComponentProps<"input">,
  "className" | "style"
> &
  AutocompleteInputVariantProps;

/**
 * The styled autocomplete text field. Base-UI-agnostic — graft the combobox behavior in
 * `components` via `<BaseAutocomplete.Input render={<AutocompleteInput/>} />`.
 */
export function AutocompleteInput({ magnitude, render, ...props }: AutocompleteInputProps) {
  const defaultProps: useRender.ElementProps<"input"> = {
    className: autocompleteInputVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "input", render, props: mergeProps(defaultProps, props) });
}
