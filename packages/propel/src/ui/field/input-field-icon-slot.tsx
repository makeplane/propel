import type * as React from "react";

import { inputFieldIconSlotVariants } from "./variants";

export type InputFieldIconSlotProps = Omit<React.ComponentProps<"span">, "className" | "style">;

/** A 16px decorative slot rendered at the inline start/end of the `InputField` control. */
export function InputFieldIconSlot(props: InputFieldIconSlotProps) {
  return <span aria-hidden className={inputFieldIconSlotVariants()} {...props} />;
}
