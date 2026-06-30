import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

export type ComboboxTriggerProps = Omit<BaseCombobox.Trigger.Props, "className" | "style">;

/**
 * A behavior wrapper that opens the combobox popup when activated. Use as the `render` target of an
 * `IconButton` so the styled primitive's look wins via render-composition:
 *
 * ```tsx
 * <IconButton
 *   prominence="ghost"
 *   tone="neutral"
 *   magnitude="md"
 *   aria-label="Open"
 *   render={<ComboboxTrigger />}
 * >
 *   <IconButtonIcon>
 *     <ChevronsUpDown />
 *   </IconButtonIcon>
 * </IconButton>;
 * ```
 *
 * Maps 1:1 to `Combobox.Trigger`.
 */
export function ComboboxTrigger(props: ComboboxTriggerProps) {
  return <BaseCombobox.Trigger {...props} />;
}
