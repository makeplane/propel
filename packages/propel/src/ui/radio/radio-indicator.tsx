import { Radio as BaseRadio } from "@base-ui/react/radio";

import { radioIndicatorVariants } from "./variants";

export type RadioIndicatorProps = Omit<BaseRadio.Indicator.Props, "className" | "style">;

/**
 * The selected dot (Base UI `Radio.Indicator`). An 8px circle filled with the Root's
 * `currentColor`, mounted by the primitive only while the option is checked. Rendered inside a
 * `Radio`.
 */
export function RadioIndicator(props: RadioIndicatorProps) {
  return <BaseRadio.Indicator className={radioIndicatorVariants()} {...props} />;
}
