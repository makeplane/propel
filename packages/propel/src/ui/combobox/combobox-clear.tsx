import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

export type ComboboxClearProps = Omit<BaseCombobox.Clear.Props, "className" | "style">;

/**
 * A behavior wrapper that clears the combobox value when activated. Use as the `render` target of
 * an `IconButton` so the styled primitive's look wins via render-composition:
 *
 * ```tsx
 * <IconButton
 *   prominence="ghost"
 *   tone="neutral"
 *   magnitude="md"
 *   aria-label="Clear"
 *   render={<ComboboxClear />}
 * >
 *   <IconButtonIcon>
 *     <X />
 *   </IconButtonIcon>
 * </IconButton>;
 * ```
 *
 * Maps 1:1 to `Combobox.Clear`.
 */
export function ComboboxClear(props: ComboboxClearProps) {
  return <BaseCombobox.Clear {...props} />;
}
