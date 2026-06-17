import { Radio as BaseRadio } from "@base-ui/react/radio";
import * as React from "react";

import { radioVariants } from "./radio-styles";

export type RadioProps = Omit<
  React.ComponentProps<typeof BaseRadio.Root>,
  "className" | "render" | "style"
>;

/**
 * A single radio option (Base UI `Radio.Root` + `Radio.Indicator`). The 16px ring and 8px inner dot
 * follow Figma node 2159-4535; the selected and disabled states come from the primitive. Use
 * `disabled` for a non-editable (read-only) option — see the module comment above for why
 * `readOnly` is avoided. Must be rendered inside a `RadioGroup`.
 *
 * @param value - The unique value this option contributes to its `RadioGroup`.
 */
export function Radio(props: RadioProps) {
  return (
    <BaseRadio.Root className={radioVariants()} {...props}>
      <BaseRadio.Indicator
        // The inner dot: 8px (`size-2`) filled with the Root's `currentColor`, only
        // present while selected (Base UI mounts the Indicator when checked).
        className="size-2 rounded-full bg-current"
      />
    </BaseRadio.Root>
  );
}
