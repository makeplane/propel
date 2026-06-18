import { Select as BaseSelect } from "@base-ui/react/select";
import type * as React from "react";

import { selectPopupVariants } from "./variants";

export type SelectPopupProps = Omit<
  React.ComponentProps<typeof BaseSelect.Popup>,
  "className" | "style"
>;

export function SelectPopup(props: SelectPopupProps) {
  return <BaseSelect.Popup className={selectPopupVariants()} {...props} />;
}
