import { Select as BaseSelect } from "@base-ui/react/select";

import { selectPopupVariants } from "./variants";

export type SelectPopupProps = Omit<BaseSelect.Popup.Props, "className" | "style">;

export function SelectPopup(props: SelectPopupProps) {
  return <BaseSelect.Popup className={selectPopupVariants()} {...props} />;
}
