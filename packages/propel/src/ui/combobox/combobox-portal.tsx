import { Combobox as BaseCombobox } from "@base-ui/react/combobox";

export type ComboboxPortalProps = Omit<BaseCombobox.Portal.Props, "className" | "style">;

export function ComboboxPortal(props: ComboboxPortalProps) {
  return <BaseCombobox.Portal {...props} />;
}
