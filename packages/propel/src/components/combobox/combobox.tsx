import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

export type ComboboxProps<Value, Multiple extends boolean | undefined = false> = Omit<
  BaseCombobox.Root.Props<Value, Multiple>,
  "className" | "style"
>;

/**
 * The combobox Root — Base UI's context/state provider (renders no element of its own). A
 * behavior-only role, so it lives in `components` (rules 1a, 2); the styled parts live in
 * `elements/combobox` and are grafted onto Base UI behavior here.
 */
export function Combobox<Value, Multiple extends boolean | undefined = false>(
  props: ComboboxProps<Value, Multiple>,
) {
  return <BaseCombobox.Root {...props} />;
}
