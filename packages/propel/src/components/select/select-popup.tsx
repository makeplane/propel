import { Select as BaseSelect } from "@base-ui/react/select";
import type * as React from "react";

import { selectPopupVariants } from "./select-styles";

export type SelectPopupProps = Omit<
  React.ComponentProps<typeof BaseSelect.Popup>,
  "className" | "render" | "style"
>;

export function SelectPopup(props: SelectPopupProps) {
  return <BaseSelect.Popup className={selectPopupVariants()} {...props} />;
}
