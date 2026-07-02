import { Select as BaseSelect } from "@base-ui/react/select";
import { ChevronsUpDown } from "lucide-react";
import type * as React from "react";

import {
  SelectTrigger as SelectTriggerElement,
  type SelectTriggerMagnitude,
  SelectValue,
} from "../../elements/select";
import { Icon } from "../../internal/icon";

export type SelectTriggerProps = Omit<
  BaseSelect.Trigger.Props,
  "children" | "className" | "render" | "style"
> & {
  /** Visual size of the trigger: controls its height, text, and icon size. Required. */
  magnitude: SelectTriggerMagnitude;
  /** Glyph for the trailing `SelectIcon` slot. Defaults to a chevrons-up-down. */
  icon?: React.ReactNode;
  /** Shown in the trigger while nothing is selected — Base UI's `Select.Value` placeholder. */
  placeholder?: React.ReactNode;
};

/**
 * The ready-made select trigger: grafts Base UI's `Select.Trigger` behavior onto the styled trigger
 * and bakes its anatomy — the selected value (Base UI's `Select.Value` grafted onto the styled
 * `SelectValue`) plus the trailing `SelectIcon`, whose default glyph is overridable via `icon`
 * (defaults are a `components` concern). Children are baked, so the prop is omitted.
 */
export function SelectTrigger({ icon, magnitude, placeholder, ...props }: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger {...props} render={<SelectTriggerElement magnitude={magnitude} />}>
      <BaseSelect.Value render={<SelectValue />} placeholder={placeholder} />
      <Icon tint="secondary">{icon ?? <ChevronsUpDown aria-hidden />}</Icon>
    </BaseSelect.Trigger>
  );
}
