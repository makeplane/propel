import { Radio as BaseRadio } from "@base-ui/react/radio";
import type * as React from "react";

import { radioVariants } from "./variants";

export type RadioProps = Omit<React.ComponentProps<typeof BaseRadio.Root>, "className" | "style">;

/**
 * A single radio ring (Base UI `Radio.Root`). The 16px ring follows Figma node 2159-4535; the
 * selected and disabled states come from the primitive. Use `disabled` for a non-editable
 * (read-only) option — see the module comment for why `readOnly` is avoided. Must be rendered
 * inside a `RadioGroup`, and render a `RadioIndicator` as its child for the selected dot.
 *
 * @param value - The unique value this option contributes to its `RadioGroup`.
 */
export function Radio(props: RadioProps) {
  return <BaseRadio.Root className={radioVariants()} {...props} />;
}
