import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompleteTriggerProps = Omit<BaseAutocomplete.Trigger.Props, "className" | "style">;

/**
 * A behavior wrapper that opens the autocomplete popup when activated. Use as the `render` target
 * of an `IconButton` so the styled primitive's look wins via render-composition:
 *
 * ```tsx
 * <IconButton
 *   prominence="ghost"
 *   tone="neutral"
 *   magnitude="md"
 *   aria-label="Open"
 *   render={<AutocompleteTrigger />}
 * >
 *   <IconButtonIcon>
 *     <ChevronsUpDown />
 *   </IconButtonIcon>
 * </IconButton>;
 * ```
 *
 * Maps 1:1 to `Autocomplete.Trigger`.
 */
export function AutocompleteTrigger(props: AutocompleteTriggerProps) {
  return <BaseAutocomplete.Trigger {...props} />;
}
