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
   * Button size. Required for standalone usage. When inside a `ToggleGroup`, omit it and let the
   * group provide a consistent magnitude via context; pass it explicitly to override the group's
   * choice.
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
  // An explicit `magnitude` wins; otherwise inherit the group's (if inside one). Standalone
  // Toggles must always pass `magnitude` — there is no silent fallback.
  const groupMagnitude = React.useContext(ToggleGroupContext);
  const effectiveMagnitude = magnitude ?? groupMagnitude;
  return <BaseToggle className={toggleVariants({ magnitude: effectiveMagnitude })} {...props} />;
}
