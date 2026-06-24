import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";

import { navItemHeaderToggleVariants } from "./variants";

export type NavItemHeaderToggleProps = Omit<BaseCollapsible.Trigger.Props, "className" | "style">;

/**
 * The toggle button inside a `NavItemHeader`. Collapses and expands its section's `NavItemPanel`;
 * Base UI sets `aria-expanded` for you. Compose a `NavItemHeaderLabel` and a
 * `NavItemHeaderIndicator` inside it.
 */
export function NavItemHeaderToggle(props: NavItemHeaderToggleProps) {
  return (
    <BaseCollapsible.Trigger type="button" className={navItemHeaderToggleVariants()} {...props} />
  );
}
