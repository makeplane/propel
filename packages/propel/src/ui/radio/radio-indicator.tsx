import { Radio as BaseRadio } from "@base-ui/react/radio";
import type * as React from "react";

import { radioIndicatorVariants } from "./variants";

export type RadioIndicatorProps = Omit<
  React.ComponentProps<typeof BaseRadio.Indicator>,
  "className" | "style"
>;

/**
 * The selected dot (Base UI `Radio.Indicator`). An 8px circle filled with the Root's
 * `currentColor`, mounted by the primitive only while the option is checked. Rendered inside a
 * `Radio`.
 */
export function RadioIndicator(props: RadioIndicatorProps) {
  return <BaseRadio.Indicator className={radioIndicatorVariants()} {...props} />;
}
