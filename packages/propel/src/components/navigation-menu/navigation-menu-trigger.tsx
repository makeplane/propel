import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import {
  NavigationMenuIcon,
  NavigationMenuTrigger as NavigationMenuTriggerElement,
  NavigationMenuTriggerLabel,
} from "../../elements/navigation-menu";

export type NavigationMenuTriggerProps = Omit<
  BaseNavigationMenu.Trigger.Props,
  "children" | "className" | "style"
> & {
  /** Replaces the default disclosure caret (a down chevron) in the trigger's `Icon` slot. */
  icon?: React.ReactNode;
  /** Visible trigger label. */
  label: React.ReactNode;
};

/**
 * The ready-made trigger row: grafts Base UI's `NavigationMenu.Trigger` behavior onto the styled
 * trigger, wraps the label, and bakes the rotating disclosure caret (`NavigationMenuIcon` with a
 * default chevron — defaults are a `components` concern, rule 2a). Override the glyph via `icon`.
 */
export function NavigationMenuTrigger({ icon, label, ...props }: NavigationMenuTriggerProps) {
  return (
    <BaseNavigationMenu.Trigger {...props} render={<NavigationMenuTriggerElement />}>
      <NavigationMenuTriggerLabel>{label}</NavigationMenuTriggerLabel>
      <BaseNavigationMenu.Icon render={<NavigationMenuIcon />}>
        {icon ?? <ChevronDown aria-hidden />}
      </BaseNavigationMenu.Icon>
    </BaseNavigationMenu.Trigger>
  );
}
