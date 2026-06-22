import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import type { Toggle as BaseToggleTypes } from "@base-ui/react/toggle";
import * as React from "react";

import { ToggleGroupContext } from "./toggle-group-context";
import { type ToggleMagnitude, toggleVariants } from "./variants";

export type ToggleProps<Value extends string = string> = Omit<
  BaseToggleTypes.Props<Value>,
  "className" | "style"
> & {
  /**
   * Button size. Optional because a `Toggle` inside a `ToggleGroup` inherits the group's magnitude;
   * standalone it falls back to `md`.
   */
  magnitude?: ToggleMagnitude;
};

/**
 * A two-state button (pressed / not pressed) — typically wrapping an icon. Built on Base UI's
 * `Toggle`, so pressed/disabled are control state (`pressed`/`defaultPressed`, `disabled`),
 * reflected as `[data-pressed]`/`[data-disabled]`. Only `magnitude` is a visual axis. Maps 1:1 to
 * `Toggle`.
 */
export function Toggle<Value extends string = string>({ magnitude, ...props }: ToggleProps<Value>) {
  // An explicit `magnitude` wins; otherwise inherit the group's (if inside one); a standalone
  // toggle with neither falls back to `md` so it always has a size.
  const groupMagnitude = React.useContext(ToggleGroupContext);
  const effectiveMagnitude = magnitude ?? groupMagnitude ?? "md";
  return <BaseToggle className={toggleVariants({ magnitude: effectiveMagnitude })} {...props} />;
}
