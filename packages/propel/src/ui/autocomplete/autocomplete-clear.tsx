import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompleteClearProps = Omit<BaseAutocomplete.Clear.Props, "className" | "style">;

/**
 * A behavior wrapper that clears the autocomplete value when activated. Use as the `render` target
 * of an `IconButton` so the styled primitive's look wins via render-composition:
 *
 * ```tsx
 * <IconButton
 *   prominence="ghost"
 *   tone="neutral"
 *   magnitude="md"
 *   aria-label="Clear"
 *   render={<AutocompleteClear />}
 * >
 *   <IconButtonIcon>
 *     <X />
 *   </IconButtonIcon>
 * </IconButton>;
 * ```
 *
 * Maps 1:1 to `Autocomplete.Clear`.
 */
export function AutocompleteClear(props: AutocompleteClearProps) {
  return <BaseAutocomplete.Clear {...props} />;
}
